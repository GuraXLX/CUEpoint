# CuePoint AI - UI Specification v2.0 🎛️

## 🎨 Design Philosophy: "Cyber-Analogue"
CuePoint AI v2.0 introduces a high-fidelity interface that bridges the gap between futuristic digital displays and tactile professional audio hardware. This design language, dubbed **"Glass Cockpit,"** prioritizes information density, visual hierarchy, and immediate feedback.

---

## 🧩 Core Components

### 1. The Glass Cockpit (PlayerBar Left)
A recessed, glossy display area that houses critical track metadata.
- **Visuals**: Dark glass background (`bg-[#030303]`) with a subtle gradient reflection and inner shadow `shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]`.
- **Typography**: Uses `font-display` for the track title with a `text-shadow-glow` effect.
- **Deck Status**: Clearly marked "DK-A" or "DK-B" in monospace font.

### 2. Holographic Waveform (PlayerBar Center)
A dynamic, canvas-based visualization of audio data.
- **Aesthetic**: Uses a clear cyan gradient (`#00F2FE` to `#4facfe`) with a "scanline" overlay pattern.
- **Behavior**: Real-time rendering of amplitude bars. Played segments glow, upcoming segments remain dim.
- **Interactivity**: Hovering reveals a precision playhead and time tooltips.

### 3. Tactile Transport (PlayerBar Center)
Controls designed to feel like physical buttons.
- **Play Button**: The hero element. A backlit white button (`bg-white`) that pulses `bg-primary/20` when active. Inner shadows simulate a concave surface.
- **Secondary Controls**: Shuffle/Repeat buttons are recessed into the chassis (`bg-[#111]`) with subtle borders.

### 4. System Telemetry (PlayerBar Right)
Micro-displays for system health, relocated from the sidebar to save space.
- **Metrics**: CPU Load, SSD Usage, Latency.
- **Style**: Monospace fonts in high-contrast containers.

---

## 📐 Layout System

### Dashboard Layout
- **Sidebar**: Fixed width (64px collapsed / 240px expanded).
- **PlayerBar**: Fixed height (96px), anchored to bottom `z-50`.
- **RightPanel**: Collapsible context drawer.

### RightPanel (Queue & Context)
- **Default State**: Open.
- **Toggle Behavior**: Controlled via `DashboardLayout` state.
- **Content**:
    - **Top**: "Queue & Context" header with Command Search.
    - **Body**: Active Process Queue (e.g., "Analyzing Stems").
    - **Transition**: Smooth width transition when toggling.

---

## 🖍️ Color Tokens

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `primary` | `#00F2FE` | Active states, waveform, primary glow |
| `accent` | `#FF3366` | Alerts, recording status, critical actions |
| `void` | `#080808` | Main background chassis |
| `glass` | `#0A0A0A` | Popovers, recessed screens |
| `text-muted` | `#737373` | Secondary labels, distinct from disabled |

---

## ⚡ Interactions
- **Hover**: All interactive elements have `hover:text-white` or brightness lift.
- **Active**: Buttons scale down `active:scale-95` to simulate key travel depth.
- **Transitions**: All state changes use `transition-all duration-200`.
