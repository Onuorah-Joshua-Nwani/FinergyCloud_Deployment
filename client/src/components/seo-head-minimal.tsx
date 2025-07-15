// Minimal SEO head component that avoids React hooks
interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const DEFAULT_SEO = {
  title: "FinergyCloud - AI Risk Intelligence for Renewable Energy Investors",
  description: "Transform renewable energy investment decisions with AI-powered analytics. IRR simulation, ESG scoring, and risk profiling for emerging markets.",
  keywords: "FinergyCloud, renewable energy investment, AI risk intelligence, ESG scoring, IRR simulation, emerging markets, sustainable finance",
  ogImage: "https://www.finergycloud.com/assets/images/finergycloud-logo.png"
};

export default function SEOHead({ title, description, keywords, ogImage }: SEOHeadProps) {
  // Set SEO immediately without hooks
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const finalTitle = title || DEFAULT_SEO.title;
    const finalDescription = description || DEFAULT_SEO.description;
    const finalKeywords = keywords || DEFAULT_SEO.keywords;
    const finalOgImage = ogImage || DEFAULT_SEO.ogImage;
    
    // Update document title
    document.title = finalTitle;
    
    // Update meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', finalDescription);
    updateMetaTag('og:image', finalOgImage);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalOgImage);
  }
  
  return null; // This component doesn't render anything
}

function updateMetaTag(name: string, content: string) {
  if (typeof document === 'undefined') return;
  
  // Handle both name and property attributes
  const selector = `meta[name="${name}"], meta[property="${name}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}