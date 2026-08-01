# Analyze Page Features - Quick Reference

## 🎯 What Was Added

### 1. AI Investment Committee Chat
- **File:** `src/routes/analyze.tsx`
- **State:** `chatMessages`, `chatInput`, `isTyping`
- **Mock Data:** `suggestedQuestions`, `chatResponses`
- **Features:**
  - Send messages to AI committee
  - Get intelligent, contextual responses
  - Click suggested questions
  - See typing indicator
  - Scroll chat history

### 2. Action Plan Card
- **Mock Data:** `actionPlan`
- **Displays:**
  - Today's action
  - Entry price ($238.50)
  - Target price ($274.00)
  - Stop loss ($226.00)
  - Position size
  - Time horizon (6-9 months)
  - 5 execution notes

### 3. Confidence History
- **Mock Data:** `confidenceHistory`
- **Shows:**
  - Yesterday: 78% (no change)
  - Last Week: 82% (-4%)
  - Last Month: 71% (+7%)
- **Includes:** Arrows, changes, previous recommendations

### 4. Recommendation Scenarios
- **Mock Data:** `recommendationScenarios`
- **6 Scenarios:**
  - 4 negative events
  - 2 positive events
- **Each Shows:**
  - Event description
  - New recommendation
  - Confidence change
  - Likelihood (Low/Medium/High)

### 5. Enhanced Discussion
- **Mock Data:** `enhancedDiscussion`
- **Improvements:**
  - 10 messages (was 7)
  - 3 phases: opening, debate, consensus
  - Response threading
  - Phase color coding
  - Consensus badges

---

## 📂 Files Modified

### `src/types/index.ts`
Added:
- `ChatMessage`
- `SuggestedQuestion`
- `ActionPlan`
- `ConfidenceHistory`
- `RecommendationScenario`
- `EnhancedDiscussionMessage`

### `src/data/mock-data.ts`
Added:
- `suggestedQuestions` (6 questions)
- `chatResponses` (object with responses)
- `actionPlan` (complete plan object)
- `confidenceHistory` (3 periods)
- `recommendationScenarios` (6 scenarios)
- `enhancedDiscussion` (10 messages)

### `src/routes/analyze.tsx`
Added:
- Chat state management
- Chat UI section
- Action plan section
- Confidence history section
- Scenarios section
- Enhanced discussion rendering
- New icon imports

---

## 🎨 Design System Used

### Colors
```
success     - Green (positive, buy, gains)
destructive - Red (negative, risk, losses)
warning     - Yellow (caution, conflict)
info        - Blue (information, neutral)
primary     - Brand color (emphasis)
muted-foreground - Secondary text
```

### Components Used
- `Input` - Chat input field
- `Button` - Send button, action buttons
- `Badge` - Recommendation badges, likelihood
- `Avatar` - User and AI avatars
- `Accordion` - Collapsible sections
- `motion` - Animations

### Icons Used
```typescript
Send          - Chat send button
Target        - Action plan header
Calendar      - Time horizon
ArrowUpRight  - Positive changes
ArrowDownRight - Negative changes
AlertTriangle - Scenarios warning
BrainCircuit  - AI chat header
```

---

## 🔧 How It Works

### Chat Flow
```
1. User types question OR clicks suggested question
2. Message added to chatMessages state
3. isTyping set to true
4. After 1200ms delay:
   - Find matching response by question ID
   - If no match, use default response
   - Add AI message to chatMessages
   - Set isTyping to false
```

### Response Matching
```typescript
// Check if clicked from suggested questions
const questionId = suggestedQuestions.find(q => q.text === text)?.id;

// Get specific or default response
const responseText = questionId && chatResponses[questionId] 
  ? chatResponses[questionId] 
  : chatResponses.default;
```

---

## 📊 Mock Data Structure

### Chat Response Topics
- `q1` - Technical vs risk expert
- `q2` - Change to SELL triggers
- `q3` - P/E ratio comparison
- `q4` - Best entry timing
- `q5` - Earnings downside risk
- `q6` - Buy now vs wait
- `default` - Fallback response

### Action Plan Fields
```typescript
{
  todaysAction: string
  entryPrice: number
  targetPrice: number
  stopLoss: number
  positionSize: string
  timeHorizon: string
  notes: string[]
}
```

### Scenario Structure
```typescript
{
  id: string
  event: string
  description: string
  impact: "negative" | "positive" | "neutral"
  newRecommendation: Recommendation
  newConfidence: number
  changeInConfidence: number
  likelihood: "Low" | "Medium" | "High"
}
```

---

## 🎯 Key Functions

### handleSendMessage
```typescript
const handleSendMessage = (text: string) => {
  // Add user message
  // Set typing state
  // Simulate delay
  // Match response
  // Add AI message
}
```

### handleSuggestedQuestion
```typescript
const handleSuggestedQuestion = (question: string) => {
  handleSendMessage(question);
}
```

---

## 🚀 Testing Checklist

### Chat Feature
- ✅ Type and send custom messages
- ✅ Click suggested questions
- ✅ See typing indicator
- ✅ Receive contextual responses
- ✅ Scroll chat history

### Action Plan
- ✅ All metrics display correctly
- ✅ Percentages calculated properly
- ✅ Colors match intent (success/destructive)
- ✅ Notes render as bullets

### Confidence History
- ✅ Three periods show
- ✅ Changes calculate correctly
- ✅ Arrows point right direction
- ✅ Badges show correct recommendations

### Scenarios
- ✅ All 6 scenarios render
- ✅ Colors match impact
- ✅ Likelihood badges visible
- ✅ Confidence changes accurate

### Discussion
- ✅ 10 messages display
- ✅ Phase colors correct
- ✅ Responses indented
- ✅ Consensus badges show
- ✅ Animations smooth

---

## 💡 Quick Tips

### Adding New Chat Responses
1. Add question to `suggestedQuestions`
2. Add response to `chatResponses` with question ID as key
3. Response appears automatically

### Adding New Scenarios
1. Add to `recommendationScenarios` array
2. Ensure all required fields present
3. Will render automatically in grid

### Modifying Action Plan
- Edit `actionPlan` object in mock-data.ts
- All calculations update automatically
- Percentages computed from prices

### Changing Confidence Data
- Edit `confidenceHistory` array
- Arrows and colors update based on `change` value
- Negative = red down arrow
- Positive = green up arrow
- Zero = no arrow

---

## 🎓 Component Architecture

```
Analyze Page
├── Search Bar (existing)
├── Loading State (existing)
├── Done State (enhanced)
│   ├── Final Recommendation (existing)
│   ├── Expert Cards (existing)
│   ├── Charts Section (existing)
│   ├── Enhanced Discussion ⭐ IMPROVED
│   ├── AI Chat ⭐ NEW
│   ├── Action Plan ⭐ NEW
│   ├── Confidence History ⭐ NEW
│   ├── Scenarios ⭐ NEW
│   └── Emotion Check (existing)
```

---

## 📈 Performance Notes

- Chat responses: Instant (mock, no API call)
- Typing delay: 1200ms (configurable)
- Animations: GPU-accelerated via Framer Motion
- Bundle impact: +12.81 KB (acceptable)

---

## 🔄 State Flow

```
User Action → Update State → Render Change
     ↓
  Send Message
     ↓
  Add to chatMessages
     ↓
  Show typing (isTyping: true)
     ↓
  Wait 1200ms
     ↓
  Match response
     ↓
  Add AI message
     ↓
  Hide typing (isTyping: false)
```

---

## ✨ Visual Hierarchy

### Section Order
1. Search & Results Summary
2. Expert Cards (most important)
3. Charts & Data
4. **Enhanced Discussion** (expert reasoning)
5. **AI Chat** (interactive Q&A)
6. **Action Plan** (what to do)
7. **Confidence History** (temporal context)
8. **Scenarios** (risk awareness)
9. Emotion Check (behavioral nudge)

### Information Flow
```
Analysis → Discussion → Questions → Action → History → Scenarios
   ↓          ↓           ↓          ↓         ↓          ↓
 What       Why         How        Do       Was       Could
```

---

## 🎉 Success Metrics

The enhancements deliver:

1. **Interactivity** - Users can ask questions
2. **Clarity** - Clear action plan provided
3. **Context** - Historical perspective shown
4. **Awareness** - Risk scenarios highlighted
5. **Transparency** - Better debate flow

All without changing the core UI or requiring backend!
