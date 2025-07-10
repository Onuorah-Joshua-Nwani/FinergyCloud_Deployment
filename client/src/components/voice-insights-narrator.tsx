import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Headphones,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Leaf,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface VoiceInsight {
  id: string;
  type: 'portfolio' | 'market' | 'risk' | 'opportunity' | 'alert';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  duration: number; // in seconds
  spoken: boolean;
}

interface VoiceSettings {
  enabled: boolean;
  autoPlay: boolean;
  speed: number; // 0.5 to 2.0
  voice: string;
  volume: number; // 0 to 100
}

export default function VoiceInsightsNarrator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<VoiceInsight | null>(null);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    autoPlay: false,
    speed: 1.0,
    voice: 'default',
    volume: 80
  });
  const [isListening, setIsListening] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const recognition = useRef<any>(null);

  // Sample insights data
  const [insights, setInsights] = useState<VoiceInsight[]>([
    {
      id: 'insight-1',
      type: 'portfolio',
      title: 'Portfolio Performance Update',
      content: 'Your renewable energy portfolio has gained 3.2% this week, with solar projects leading the performance at 4.8% growth. The Lagos Solar Farm contributed significantly with improved weather conditions increasing generation by 15%.',
      priority: 'medium',
      timestamp: '5 minutes ago',
      duration: 12,
      spoken: false
    },
    {
      id: 'insight-2',
      type: 'opportunity',
      title: 'New Investment Opportunity',
      content: 'A new wind farm project in Kano has become available with projected IRR of 18.5%. This opportunity matches your risk profile and sector preferences. The project has strong government backing and excellent wind resource assessments.',
      priority: 'high',
      timestamp: '15 minutes ago',
      duration: 15,
      spoken: false
    },
    {
      id: 'insight-3',
      type: 'risk',
      title: 'Risk Alert',
      content: 'Weather patterns indicate potential reduced solar generation in the Lagos region for the next 7 days. This may impact your solar portfolio performance by approximately 8%. Consider reviewing hedging strategies.',
      priority: 'medium',
      timestamp: '1 hour ago',
      duration: 10,
      spoken: false
    },
    {
      id: 'insight-4',
      type: 'market',
      title: 'Market Analysis',
      content: 'The Nigerian renewable energy market is experiencing significant growth with new policy incentives announced. Feed-in tariffs have increased by 12% for new solar projects, creating attractive investment conditions for the next quarter.',
      priority: 'high',
      timestamp: '2 hours ago',
      duration: 14,
      spoken: false
    }
  ]);

  // Initialize speech synthesis and recognition
  useEffect(() => {
    speechSynthesis.current = window.speechSynthesis;
    
    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesis.current?.getVoices() || [];
      setAvailableVoices(voices);
    };

    loadVoices();
    speechSynthesis.current?.addEventListener('voiceschanged', loadVoices);

    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      speechSynthesis.current?.removeEventListener('voiceschanged', loadVoices);
      stopSpeaking();
    };
  }, []);

  const speakInsight = (insight: VoiceInsight) => {
    if (!speechSynthesis.current || !voiceSettings.enabled) return;

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(insight.content);
    utterance.rate = voiceSettings.speed;
    utterance.volume = voiceSettings.volume / 100;
    
    // Set voice if available
    const selectedVoice = availableVoices.find(voice => 
      voice.name === voiceSettings.voice || voice.default
    );
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentInsight(insight);
      setPlaybackProgress(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentInsight(null);
      setPlaybackProgress(0);
      markAsSpoken(insight.id);
      
      // Auto-play next insight if enabled
      if (voiceSettings.autoPlay) {
        const nextInsight = getNextUnspokenInsight();
        if (nextInsight) {
          setTimeout(() => speakInsight(nextInsight), 1000);
        }
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentInsight(null);
      setPlaybackProgress(0);
    };

    currentUtterance.current = utterance;
    speechSynthesis.current.speak(utterance);

    // Update progress
    const progressInterval = setInterval(() => {
      if (!speechSynthesis.current?.speaking) {
        clearInterval(progressInterval);
        return;
      }
      setPlaybackProgress(prev => Math.min(prev + 1, insight.duration));
    }, 1000);
  };

  const stopSpeaking = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
    }
    setIsPlaying(false);
    setCurrentInsight(null);
    setPlaybackProgress(0);
  };

  const pauseResumeSpeaking = () => {
    if (!speechSynthesis.current) return;

    if (speechSynthesis.current.speaking && !speechSynthesis.current.paused) {
      speechSynthesis.current.pause();
    } else if (speechSynthesis.current.paused) {
      speechSynthesis.current.resume();
    }
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    // Voice command processed
    
    if (command.includes('play') || command.includes('start')) {
      const nextInsight = getNextUnspokenInsight();
      if (nextInsight) speakInsight(nextInsight);
    } else if (command.includes('stop') || command.includes('pause')) {
      if (isPlaying) {
        pauseResumeSpeaking();
      } else {
        stopSpeaking();
      }
    } else if (command.includes('next')) {
      const nextInsight = getNextUnspokenInsight();
      if (nextInsight) speakInsight(nextInsight);
    } else if (command.includes('repeat')) {
      if (currentInsight) speakInsight(currentInsight);
    } else if (command.includes('portfolio')) {
      const portfolioInsight = insights.find(i => i.type === 'portfolio' && !i.spoken);
      if (portfolioInsight) speakInsight(portfolioInsight);
    } else if (command.includes('market')) {
      const marketInsight = insights.find(i => i.type === 'market' && !i.spoken);
      if (marketInsight) speakInsight(marketInsight);
    }
  };

  const getNextUnspokenInsight = (): VoiceInsight | null => {
    return insights.find(insight => !insight.spoken) || null;
  };

  const markAsSpoken = (insightId: string) => {
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, spoken: true } : insight
    ));
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'portfolio': return <TrendingUp className="w-4 h-4" />;
      case 'market': return <DollarSign className="w-4 h-4" />;
      case 'risk': return <AlertCircle className="w-4 h-4" />;
      case 'opportunity': return <Leaf className="w-4 h-4" />;
      case 'alert': return <AlertCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unspokenCount = insights.filter(i => !i.spoken).length;

  return (
    <div className="space-y-6">
      {/* Voice Control Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-primary" />
              <CardTitle>Voice-Enabled Investment Insights</CardTitle>
            </div>
            <Badge variant="outline">
              {unspokenCount} new insights
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Listen to AI-powered insights about your renewable energy investments
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={isPlaying ? "destructive" : "default"}
                size="sm"
                onClick={() => isPlaying ? stopSpeaking() : speakInsight(getNextUnspokenInsight()!)}
                disabled={!getNextUnspokenInsight()}
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isPlaying ? 'Stop' : 'Play Next'}
              </Button>

              <Button
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                onClick={() => isListening ? stopListening() : startListening()}
                disabled={!recognition.current}
              >
                {isListening ? <MicOff className="w-4 h-4 mr-1" /> : <Mic className="w-4 h-4 mr-1" />}
                {isListening ? 'Stop Listening' : 'Voice Commands'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
              >
                {voiceSettings.enabled ? 
                  <Volume2 className="w-4 h-4" /> : 
                  <VolumeX className="w-4 h-4" />
                }
              </Button>
            </div>
          </div>

          {/* Current Playback */}
          {currentInsight && (
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getInsightIcon(currentInsight.type)}
                  <span className="font-medium text-sm">{currentInsight.title}</span>
                </div>
                <Badge className={getPriorityColor(currentInsight.priority)}>
                  {currentInsight.priority}
                </Badge>
              </div>
              <Progress value={(playbackProgress / currentInsight.duration) * 100} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{playbackProgress}s</span>
                <span>{currentInsight.duration}s</span>
              </div>
            </div>
          )}

          {/* Voice Settings */}
          {showSettings && (
            <div className="mt-4 p-4 bg-white rounded-lg border space-y-4">
              <h4 className="font-medium">Voice Settings</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Speed</label>
                  <Slider
                    value={[voiceSettings.speed]}
                    onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, speed: value }))}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{voiceSettings.speed}x</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Volume</label>
                  <Slider
                    value={[voiceSettings.volume]}
                    onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, volume: value }))}
                    min={0}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{voiceSettings.volume}%</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Voice</label>
                <select
                  value={voiceSettings.voice}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                  className="w-full mt-1 p-2 border rounded text-sm"
                >
                  <option value="default">Default Voice</option>
                  {availableVoices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={voiceSettings.autoPlay}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, autoPlay: e.target.checked }))}
                />
                <label htmlFor="autoplay" className="text-sm">Auto-play next insight</label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Commands Help */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Voice Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Playback Controls</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• "Play" or "Start" - Begin playback</li>
                <li>• "Pause" or "Stop" - Pause playback</li>
                <li>• "Next" - Skip to next insight</li>
                <li>• "Repeat" - Replay current insight</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Content Navigation</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• "Portfolio" - Play portfolio insights</li>
                <li>• "Market" - Play market analysis</li>
                <li>• "Risk" - Play risk alerts</li>
                <li>• "Opportunity" - Play opportunities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map(insight => (
              <div 
                key={insight.id}
                className={`p-3 rounded-lg border transition-all ${
                  insight.spoken ? 'bg-gray-50 opacity-75' : 'bg-white hover:bg-gray-50'
                } ${currentInsight?.id === insight.id ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getInsightIcon(insight.type)}
                      <span className="font-medium text-sm">{insight.title}</span>
                      <Badge className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                      {insight.spoken && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.content}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {insight.timestamp}
                      </div>
                      <div className="flex items-center gap-1">
                        <Headphones className="w-3 h-3" />
                        {insight.duration}s
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => speakInsight(insight)}
                    disabled={currentInsight?.id === insight.id}
                  >
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}