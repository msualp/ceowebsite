# Early Access Popup Components

## Where Files Go

- `EarlyAccessPopup.tsx`: Main orchestrator
- `layout/PopupWrapper.tsx`: Handles modal UI wrapper
- `steps/`: Folder for individual step components
- `ui/`: Folder for visual components like progress bar, buttons, confetti
- `hooks/`: Reusable logic (state, persistence)

To use:
1. Import and render `EarlyAccessPopup` where needed.
2. Customize form steps and UI as needed.
3. Extend reducer and localStorage hook for state handling.

Production-ready structure, feel free to scale.
