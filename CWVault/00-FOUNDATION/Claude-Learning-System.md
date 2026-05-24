# Claude Learning System - Data Access & Learning Management

## BRIEF (read this, skip the rest if you're building)

Status: Aspirational — no implementation exists yet. Design-level specification.
Last updated: January 29, 2026

What this covers:
- Child data model (learning history, curiosity threads, session patterns)
- Maya personalization (how the Guide adapts to individual children)
- Practice scheduling (forgetting curve, spaced repetition)
- Privacy architecture (anonymous identifier, no real-world identity)

Related documents:
- [[00-FOUNDATION/CW-System-Foundation]] — practice methods, cognitive modes, competence map
- [[01-ACTIVE/Session-Feb17-Maya-Presence-Design]] — Maya's memory across sessions
- [[20-SPECS/Spec-Maya-Presence-Cursor]] — Maya's presence behavior (Layer 2)

Not needed for: Layer 1 or Layer 2 builds. This becomes relevant when
Claude API integration begins (future layer).

---

**Status:** Foundation Document  
**Last Updated:** January 29, 2026  
**Version:** 1.0

---

## Overview

This specification defines what data Claude (the Guide/Maya) has access to about each child, how that data is structured, and how Claude uses it to provide personalized, curiosity-driven learning experiences.

**Core Principle:** Claude is not a tracker or assessor - Claude is a conversational guide who remembers what you've explored together, understands where your curiosity leads, and helps you find the next interesting thing.

---

## What Claude Knows About Each Child

### 1. Content History

**Stories Completed:**
```json
{
  "child_id": "unique_identifier",
  "stories_completed": [
    {
      "story_id": "montparnasse-crash",
      "title": "The Montparnasse Train Crash",
      "completed_date": "2026-01-15",
      "pages_viewed": ["what", "where", "when", "story", "why"],
      "time_spent_minutes": 18,
      "returned_to": 2
    }
  ]
}
```

**Pages Explored:**
- Which pages of each story (WHAT, WHERE, WHEN, STORY, WHY)
- Whether they skipped pages or viewed all
- Which WHY pages (full interactives) they engaged with
- How long on each page
- Whether they returned to a story later

**Timeline Context:**
- Every story adds a marker to their personal timeline
- Timeline becomes their visual history of "time traveled"
- Claude knows which historical periods they've encountered
- Clustering patterns show where their interests lie

### 2. Conversation History

**Questions Asked:**
```json
{
  "story_id": "montparnasse-crash",
  "conversations": [
    {
      "timestamp": "2026-01-15T14:23:00",
      "child_question": "Why didn't the brakes work?",
      "maya_response": "The investigation found...",
      "follow_up_questions": 3,
      "topic_thread": "brake_mechanics"
    }
  ]
}
```

**Conversation Patterns:**
- Which topics spark follow-up questions
- When child asks clarifying vs. extending questions
- Natural curiosity threads (one question leads to another)
- When child seems satisfied vs. still puzzling
- Topics they return to across multiple stories

**Voice vs. Text Mode:**
- Which mode child prefers
- When they switch modes (complex questions → text?)
- Comfort level with each mode

### 3. Interactive Tool Usage

**WHY Page Engagement:**
```json
{
  "interactive_id": "momentum-explorer",
  "story_context": "montparnasse-crash",
  "session_data": {
    "duration_minutes": 12,
    "explorations": [
      {
        "action": "changed_mass_slider",
        "values": [1000, 2000, 5000],
        "questions_during": ["What if the train was heavier?"]
      },
      {
        "action": "changed_velocity_slider", 
        "values": [20, 40, 60],
        "discovered": "velocity_squares_energy_relationship"
      }
    ],
    "insights_discussed_with_maya": [
      "why doubling speed quadruples energy",
      "relationship to stopping distance"
    ]
  }
}
```

**What Claude Tracks:**
- Which interactives they explored
- How long they engaged
- What parameters they manipulated
- Patterns discovered (even without asking)
- Questions asked during exploration
- Connections they made

### 4. Conceptual Understanding

**Prerequisites Encountered:**
```json
{
  "child_id": "unique_identifier",
  "concepts_encountered": {
    "velocity": {
      "first_seen": "montparnasse-crash",
      "reinforced_in": ["sound-physics", "projectile-motion"],
      "understanding_indicators": [
        "asked about units (mph vs m/s)",
        "compared velocities across stories",
        "used term correctly in questions"
      ],
      "confidence_level": "solid"
    },
    "momentum": {
      "first_seen": "montparnasse-crash",
      "struggled_with": "momentum vs energy distinction",
      "clarified_through": "conversation_2026-01-15",
      "confidence_level": "developing"
    }
  }
}
```

**Understanding Indicators:**
- Not quiz results - conversational evidence
- When child uses term correctly
- When they make connections between stories
- When they ask sophisticated follow-up questions
- When they need re-explanation vs. build on previous

**Prerequisite Chains:**
- What concepts this story assumes
- What concepts child has actually encountered
- When to scaffold vs. when to reference shared knowledge

### 5. Interest Patterns

**Natural Curiosity Threads:**
```json
{
  "interest_clusters": {
    "physics": {
      "stories_engaged": ["montparnasse-crash", "sound-physics", "thera-eruption"],
      "questions_count": 47,
      "deep_dives": ["how_sound_travels", "energy_transfer"],
      "related_explorations": ["checked_decibel_levels", "compared_explosion_forces"]
    },
    "ancient_history": {
      "stories_engaged": ["thera-eruption", "pompeii", "alexandria"],
      "questions_count": 31,
      "timeline_period_interest": "1000-3000_BCE",
      "cross_story_connections": ["compared destruction events", "asked about archaeology methods"]
    }
  }
}
```

**What This Reveals:**
- Which topics generate sustained curiosity
- Cross-story connections they make
- Depth vs. breadth preferences
- Whether they prefer narrative, tools, or both

**Not Tracked:**
- "Mastery levels" or "grade equivalents"
- Completion percentages or badges
- Comparison to other children
- Time-on-task as success metric

### 6. Practice & Skill Development

**Practice Sessions:**
```json
{
  "practice_type": "fraction_comparison",
  "managed_by": "maya",
  "sessions": [
    {
      "date": "2026-01-20",
      "duration_minutes": 8,
      "problems_attempted": 12,
      "patterns": {
        "strong_with": "same_denominator",
        "uncertain_with": "different_denominators",
        "strategy_used": "visual_triangle_comparison"
      },
      "child_feedback": "felt good but tired at end",
      "maya_adaptation": "shortened next session, focused on denominators"
    }
  ]
}
```

**Practice Intelligence:**
- Not scheduled by algorithm - managed by Maya in conversation
- Maya notices when child mentions wanting to practice
- Maya suggests practice when relevant to current interests
- Maya adapts difficulty/duration based on engagement
- Maya knows when to stop (fatigue, frustration)

**Error Patterns:**
- Not for grading - for understanding
- Reveals conceptual confusion vs. careless mistakes
- Informs how Maya explains in future
- Suggests which prerequisite to revisit

---

## How Claude Uses This Data

### 1. Personalized Conversation

**Referencing Shared History:**
```
Child: "What's momentum again?"

Maya: "Remember when we talked about the train crash in Paris? 
Momentum is what made it so hard to stop - it's the mass times 
the velocity. When you doubled the speed in the explorer, you 
saw the energy got four times bigger? That's because energy 
depends on velocity squared, while momentum is just velocity."
```

**Making Connections:**
```
Child: "How loud was the Thera eruption?"

Maya: "Remember how we compared decibel levels when you were 
exploring sound physics? Krakatoa was estimated at 180 dB. 
Thera was probably similar - imagine that sound traveling 
across the Mediterranean..."
```

**Adaptive Explanations:**
```
// Child has strong physics background from previous stories
Maya: "The momentum transfer in the collision..."

vs.

// Child new to physics concepts  
Maya: "When the train hit the wall, all that moving energy 
had to go somewhere..."
```

### 2. Dashboard Curation

**Next Story Suggestions:**

Based on:
- Interest clusters (loved physics → suggest more physics stories)
- Timeline gaps (explored ancient Rome, never prehistoric → suggest cave paintings)
- Natural extensions (asked about sound travel → suggest acoustics story)
- Prerequisite chains (ready for coordinate plane after number line work)

**Not Based On:**
- "Grade level appropriate"
- "Should learn next according to curriculum"
- "Most popular with other children"

**Dashboard Updates:**
```json
{
  "suggested_stories": [
    {
      "story_id": "thera-eruption",
      "reason": "You asked great questions about the Montparnasse crash forces - 
                 this volcanic eruption released incredible amounts of energy",
      "connects_to": ["physics_of_explosions", "sound_travel"],
      "new_concepts": ["volcanic_physics", "ancient_aegean"]
    }
  ]
}
```

### 3. Prerequisite Management

**Detecting Missing Prerequisites:**
```
Child exploring coordinate plane multiplication, but:
- Has not encountered negative numbers
- Hasn't worked with x/y axes
- Familiar with multiplication

Maya action:
- Briefly explains negative numbers in context
- Shows how axes work (doesn't require separate story)
- Proceeds with exploration
- Suggests number line story for later if interested
```

**Transparent Scaffolding:**
```
Maya: "This tool uses negative numbers - numbers less than zero. 
Think of them as 'opposite direction' numbers. Want to explore 
that for a minute before we continue, or should I just show you 
how they work here?"
```

### 4. Practice Scheduling

**Maya as Practice Manager:**

Not automated reminders - conversational suggestions:

```
Maya: "You mentioned wanting to get faster at comparing fractions. 
Want to practice for a few minutes? We can use those triangle 
visuals you liked."

or

Maya: "We've been talking about momentum for three different stories 
now. Want to try some practice problems? I think you're ready to 
work without the visual aids."

or

Maya (noticing struggle): "Let's come back to this tomorrow. Your 
brain needs time to process all this new stuff."
```

**Adaptive Practice:**
- Starts where child left off
- Adjusts difficulty based on recent performance
- Stops when fatigue evident (increasing errors, slower responses)
- Celebrates insights, not just correct answers
- Connects practice to stories (not isolated drills)

### 5. Learning Pattern Recognition

**What Maya Notices:**

**Curiosity Patterns:**
- "You always ask 'why' after I explain 'how' - I love that"
- "You like comparing things across stories - the train crash vs. the eruption"
- "You're drawn to the 'something went wrong' stories"

**Understanding Patterns:**
- "You get concepts faster when you see them visually first"
- "You need time to think before answering - that's great"
- "You like to test edge cases in the interactives"

**Struggle Patterns:**
- "You're confusing velocity and acceleration - let me show you the difference again"
- "You're trying to memorize instead of understand - want to explore why it works?"
- "You're tired - the errors are increasing. Let's stop here."

**Energy Patterns:**
- "Morning seems to be your best time for math"
- "After 15 minutes of practice, you need a break"
- "You engage longer with stories than pure tools"

---

## Data Structure & Storage

### Child Profile
```json
{
  "child_id": "uuid",
  "name": "chosen_name",
  "maya_name": "chosen_guide_name",
  "created": "2026-01-01",
  "preferences": {
    "voice_mode": "primary",
    "conversation_color": "#2c5aa0",
    "text_size": "default"
  },
  "learning_profile": {
    "stories_completed": [...],
    "conversations": [...],
    "interactive_sessions": [...],
    "concepts_encountered": {...},
    "interest_clusters": {...},
    "practice_history": [...],
    "timeline_markers": [...]
  }
}
```

### Story Completion Record
```json
{
  "story_id": "montparnasse-crash",
  "child_id": "uuid",
  "first_viewed": "2026-01-15T14:00:00",
  "last_viewed": "2026-01-15T14:23:00",
  "pages_viewed": ["what", "where", "when", "story", "why"],
  "time_per_page": {
    "what": 45,
    "where": 38,
    "when": 52,
    "story": 480,
    "why": 720
  },
  "conversations": [
    {
      "page": "story",
      "timestamp": "2026-01-15T14:12:00",
      "exchanges": [...]
    }
  ],
  "timeline_marker_created": {
    "date": "1895-10-22",
    "scale": "modern_sequence",
    "position": 12021
  }
}
```

### Conversation Record
```json
{
  "conversation_id": "uuid",
  "story_id": "montparnasse-crash",
  "child_id": "uuid",
  "timestamp": "2026-01-15T14:12:00",
  "page_context": "story",
  "exchanges": [
    {
      "child": "Why didn't the brakes work?",
      "maya": "The investigation found that the Westinghouse air brake system...",
      "follow_ups": 2,
      "topic": "brake_mechanics"
    }
  ],
  "concepts_discussed": ["air_brakes", "fail_safe_systems", "railway_safety"],
  "child_insights": ["made connection to modern brake systems", "asked about redundancy"],
  "duration_seconds": 180
}
```

### Practice Session Record
```json
{
  "session_id": "uuid",
  "child_id": "uuid",
  "practice_type": "fraction_comparison",
  "date": "2026-01-20T10:00:00",
  "initiated_by": "maya_suggestion",
  "child_response": "agreed",
  "problems": [
    {
      "problem": "3/4 vs 2/3",
      "child_answer": "3/4",
      "correct": true,
      "time_seconds": 8,
      "strategy_observed": "visual_triangle"
    }
  ],
  "session_end": {
    "reason": "child_requested_stop",
    "maya_observation": "good focus throughout, stopped at appropriate time",
    "next_session_adjustment": "continue current difficulty"
  }
}
```

---

## Privacy & Data Principles

### What's Stored
- Child's learning journey (stories, conversations, explorations)
- Understanding patterns (to enable better conversations)
- Practice history (to inform Maya's suggestions)
- Interest patterns (to suggest relevant content)

### What's NOT Stored
- Personally identifiable information beyond chosen name
- Comparison data (no "vs other children")
- Normative assessments (no "grade level" or "behind/ahead")
- Detailed error logs for evaluation purposes

### Data Usage
- Used ONLY by Maya to personalize this child's experience
- Never used for aggregate analysis or research
- Never shared with teachers, schools, parents (unless family explicitly requests export)
- Parent can export/delete all data at any time

### Transparency
- Child and family can see all stored data
- Maya can explain "why I suggested this story" (references data transparently)
- No hidden scoring or assessment
- Data serves conversation, not evaluation

---

## Integration with Story Template

### How Stories Provide Context to Maya

Every story includes `maya-context.json`:
```json
{
  "story_id": "montparnasse-crash",
  "content_type": "event_story",
  "prerequisite_concepts": ["velocity", "mass", "basic_physics"],
  "introduces_concepts": ["momentum", "kinetic_energy", "deceleration"],
  "natural_extensions": [
    "physics_of_collisions",
    "railway_engineering", 
    "historical_paris"
  ],
  "common_questions": [...],
  "discussion_points": [...]
}
```

### How Maya Uses Story Context

**Before Story:**
- Check if child has prerequisites
- Note concepts this will introduce
- Prepare to reference previous stories

**During Story:**
- Answer questions using story context
- Reference embedded visuals and interactives
- Note which questions child asks (interest tracking)

**After Story:**
- Add timeline marker to child's history
- Update concepts_encountered
- Suggest natural extensions if child curious
- Offer practice if appropriate

---

## Dashboard Population

### How Maya Decides What Goes on Dashboard

**Priority 1: Active Interest Threads**
- Child asked about X in last story → Suggest related X story
- Child returned to Y topic multiple times → Feature Y prominently

**Priority 2: Timeline Gaps**
- Child has explored Renaissance but not Ancient Rome
- Child has prehistoric but not early civilization period
- Suggest stories that fill temporal understanding

**Priority 3: Prerequisite Readiness**
- Child has encountered concepts needed for advanced story
- "You're ready for coordinate plane now - you've worked with both axes and multiplication"

**Priority 4: Variety**
- Balance event stories, tool stories, pure narratives
- Balance time periods (not all ancient, not all modern)
- Balance domains (physics, history, math, perception)

**What Doesn't Drive Dashboard:**
- "Completing" a subject area
- External curriculum standards
- Age-based expectations
- Time since last story (no pressure)

---

## Practice Management

### How Maya Manages Practice

**Not This (automated):**
```
"You haven't practiced fractions in 3 days. Time for practice!"
[Algorithm selects 10 problems]
[Grades performance]
[Updates mastery percentage]
```

**But This (conversational):**
```
Maya: "You mentioned wanting to get faster at comparing fractions. 
Want to practice for a few minutes?"

Child: "OK"

Maya: "Let's use those triangle visuals you liked. I'll give you 
a few to try, and you tell me when you want to stop."

[Child does 8 problems, starts slowing down]

Maya: "You're getting tired - let's stop here. You did great with 
the same-denominator ones. Want to work on different denominators 
next time, or keep practicing these until they feel automatic?"

Child: "Different denominators"

Maya: "Got it. I'll remind you in a day or two, or just ask me 
when you're ready."
```

**Maya's Practice Intelligence:**
- Notices when child needs practice (repeated errors, uncertainty in conversation)
- Suggests practice when natural (after story introduces concept)
- Respects child's choice (practice now, later, or not at all)
- Adapts difficulty based on performance (not preset levels)
- Stops when appropriate (fatigue, frustration, sufficient success)
- Connects practice to stories (not isolated skill work)

---

## Implementation Notes

### Backend Requirements
- Secure child data storage
- Real-time conversation logging
- Story completion tracking
- Practice session recording
- Timeline marker system
- Interest pattern analysis

### API Endpoints Needed
```
/child/profile/{child_id}
/child/stories/completed
/child/conversations/history
/child/practice/sessions
/child/timeline/markers
/child/interests/analysis
/dashboard/suggestions/{child_id}
```

### Maya API Integration
```
GET /maya/child-context/{child_id}/{story_id}
Returns: Relevant history for current conversation

POST /maya/conversation-log
Stores: Conversation exchange with context

GET /maya/suggest-next
Returns: Dashboard suggestions based on profile
```

---

## Success Metrics

### What Success Looks Like

**Conversational Evidence:**
- Child asks follow-up questions (curious, engaged)
- Child makes connections across stories (building understanding)
- Child returns to stories voluntarily (genuine interest)
- Child practices without prompting (intrinsic motivation)
- Child asks Maya to explain differently (metacognitive awareness)

**Pattern Evidence:**
- Conversation depth increases over time (more sophisticated questions)
- Story completion time varies (taking time when engaged, not rushing)
- Timeline markers cluster around interests (following curiosity)
- Practice sessions self-directed (child initiates)

**System Evidence:**
- Dashboard suggestions feel relevant (child chooses suggested stories)
- Prerequisites work (child rarely confused by missing background)
- Maya references feel natural (child doesn't notice data access)

### What We Don't Measure

- Stories completed per week
- "Mastery" percentages
- Time-on-task metrics
- Comparison to peers or standards
- Retention via testing

---

## Related Specifications

- [[Interface-Foundation]] - Maya button and conversation UI
- [[Story-Template]] - Five-page structure and maya-context
- [[Dashboard-Design]] - How suggestions are presented (TBD)
- [[Practice-System]] - Detailed practice mechanics (TBD)

---

## Version History

### Version 1.0 (January 29, 2026)
- Initial specification
- Defines child data structure
- Explains Maya's use of learning history
- Establishes privacy principles
- Describes dashboard curation logic
- Documents practice management approach

---

## Next Steps

1. Define technical data schema (database structure)
2. Build API for Maya to access child context
3. Create dashboard suggestion algorithm
4. Implement conversation logging
5. Build practice session recorder
6. Create timeline marker system
7. Design data export for families

---

**Document Status:** Version 1.0 - Ready for implementation planning  
**Questions:** Add to Current-Focus or discuss with Maya
