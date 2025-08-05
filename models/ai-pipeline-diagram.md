[ai-pipeline-diagram.md](https://github.com/user-attachments/files/21606955/ai-pipeline-diagram.md)
# FinergyCloud AI Pipeline - Clear Visual Overview

## **Complete Data Flow Pipeline**

```
INPUT DATA                  PREPROCESSING               AI MODELS                   OUTPUT RESULTS
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│                 │        │                 │        │                 │        │                 │
│ User Fills Form │   ───▶ │ Clean & Format  │   ───▶ │ XGBoost Models  │   ───▶ │ ESG Dashboard   │
│                 │        │    Data         │        │   Make Pred.    │        │   Shows Score   │
│ • Project Type  │        │                 │        │                 │        │                 │
│ • Location      │        │ • Validate      │        │ • Solar Model   │        │ • Risk Level    │
│ • Capacity      │        │ • Convert       │        │ • Wind Model    │        │ • ESG Score     │
│ • Grid Quality  │        │ • Normalize     │        │ • Hydro Model   │        │ • Investment    │
│ • Community     │        │ • Index         │        │ • Biomass Model │        │   Advice        │
│ • Governance    │        │                 │        │ • Geo Model     │        │ • Confidence    │
│                 │        │                 │        │                 │        │                 │
└─────────────────┘        └─────────────────┘        └─────────────────┘        └─────────────────┘
```

## **Step-by-Step Processing Flow**

### **STEP 1: USER INPUT COLLECTION**
```
Form Fields Collected:
┌─────────────────────────────────────────────────────────────┐
│ Project Type:     [Solar/Wind/Hydro/Biomass/Geothermal]    │
│ Location:         [Nigeria/Ghana/Kenya/etc]                │
│ Capacity (MW):    [Number input]                           │
│ IRR (%):         [Financial projection]                    │
│ Grid Stability:   [1-10 slider rating]                     │
│ Community Eng:    [1-10 slider rating]                     │
│ Governance:       [1-10 slider rating]                     │
└─────────────────────────────────────────────────────────────┘
```

### **STEP 2: DATA PREPROCESSING**
```
Raw Input           →    Processed Features
┌─────────────────┐      ┌─────────────────┐
│ "Solar"         │ ───▶ │ project_type: 1 │
│ "Nigeria"       │ ───▶ │ location_idx: 5 │
│ "50 MW"         │ ───▶ │ capacity: 50.0  │
│ "Grid: 7/10"    │ ───▶ │ grid_score: 0.7 │
│ "Community: 8"  │ ───▶ │ comm_score: 0.8 │
│ "Gov: 6/10"     │ ───▶ │ gov_score: 0.6  │
└─────────────────┘      └─────────────────┘
```

### **STEP 3: AI MODEL PREDICTION**
```
Input Features      →    Project-Specific Models    →    Individual Predictions
┌─────────────────┐      ┌─────────────────┐             ┌─────────────────┐
│ Processed Data  │      │ IF Solar Project│       ───▶  │ Solar Model:    │
│ [0.7, 0.8, 0.6, │ ───▶ │ ↓               │             │ Success: 87.3%  │
│  1, 5, 50.0]    │      │ Use Solar Model │             │ Confidence: 94% │
└─────────────────┘      │ (95.1% accuracy)│             └─────────────────┘
                         └─────────────────┘
                         
                         ┌─────────────────┐             ┌─────────────────┐
                         │ IF Wind Project │       ───▶  │ Wind Model:     │
                         │ ↓               │             │ Success: 82.1%  │
                         │ Use Wind Model  │             │ Confidence: 91% │
                         │ (93.8% accuracy)│             └─────────────────┘
                         └─────────────────┘
```

### **STEP 4: ENSEMBLE AGGREGATION**
```
Multiple Model Outputs    →    Weighted Average    →    Final Prediction
┌─────────────────────┐        ┌─────────────────┐      ┌─────────────────┐
│ Solar Model: 87.3%  │        │ Weight by:      │      │ Final Score:    │
│ (Weight: 0.951)     │   ───▶ │ • Model Accuracy│ ───▶ │ Success: 85.7%  │
│                     │        │ • Data Quality  │      │ Confidence: 92% │
│ Baseline: 83.2%     │        │ • Sample Size   │      │ Risk: MEDIUM    │
│ (Weight: 0.882)     │        │                 │      └─────────────────┘
└─────────────────────┘        └─────────────────┘
```

### **STEP 5: OUTPUT PROCESSING**
```
AI Prediction       →    Risk Classification    →    User Dashboard
┌─────────────────┐      ┌─────────────────────┐     ┌─────────────────┐
│ Success: 85.7%  │      │ IF Score >= 90%     │     │ ✅ ESG Score: 8.2│
│ Confidence: 92% │ ───▶ │ → Risk: LOW         │───▶ │🟡 Risk: MEDIUM │
│                 │      │                     │     │ 💰 Invest: Yes  │
│                 │      │ IF 70-89%           │     │ 📊 IRR: 12.5%   │
│                 │      │ → Risk: MEDIUM      │     │ 🌱 CO2: -2,400t │
│                 │      │                     │     │ 👥 Jobs: 45     │
│                 │      │ IF Score < 70%      │     └─────────────────┘
│                 │      │ → Risk: HIGH        │
└─────────────────┘      └─────────────────────┘
```

## **Real-Time Processing Timeline**

```
User Clicks Submit  →  Data Validation  →  Feature Engineering  →  Model Prediction  →  Results Display
      0ms                   20ms               50ms                   120ms              180ms
      │                     │                  │                      │                  │
      ├─ Form Data          ├─ Zod Schema      ├─ Type Encoding       ├─ XGBoost         ├─ Risk Bands
      ├─ Currency           ├─ Error Check     ├─ Normalization       ├─ Ensemble        ├─ ESG Metrics  
      └─ Submit Button      └─ Convert Values  └─ Feature Matrix      └─ Confidence      └─ Investment Advice

Total Response Time: < 200ms
```

## **Model Selection Logic**

```
Project Type Detection:
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  User Input: "Solar"  ────┐                                     │
│                           │                                     │
│  ┌─────────────────────────▼─────────────────────────┐          │
│  │  Route to Solar-Optimized XGBoost Model           │          │
│  │  • Trained on 3,247 solar projects                │          │
│  │  • 95.1% accuracy on solar-specific features      │          │
│  │  • Includes solar irradiance, panel efficiency    │          │
│  └─────────────────────────┬─────────────────────────┘          │
│                           │                                     │
│  Final Prediction: 87.3% Success Rate ──────────────────────────│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

This pipeline processes each ESG assessment in under 200ms, delivering accurate investment predictions with clear explanations for every step.
