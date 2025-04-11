# Screen Reader Testing Guidelines

This document provides guidelines for testing the CEO website with screen readers to ensure it's accessible to users with visual impairments.

## Overview

Screen readers are assistive technologies that convert digital text into synthesized speech, allowing users with visual impairments to access and navigate websites. Testing with screen readers is an essential part of ensuring web accessibility.

## Recommended Screen Readers

We recommend testing with the following screen readers to ensure broad compatibility:

1. **NVDA** (NonVisual Desktop Access) - Windows
   - Free and open-source
   - [Download NVDA](https://www.nvaccess.org/download/)
   - Used by approximately 65% of screen reader users

2. **VoiceOver** - macOS and iOS
   - Built into Apple devices
   - Activate on Mac: System Preferences > Accessibility > VoiceOver or press Command+F5
   - Used by approximately 30% of screen reader users

3. **JAWS** (Job Access With Speech) - Windows
   - Commercial product with free demo
   - [Download JAWS](https://www.freedomscientific.com/products/software/jaws/)
   - Used by approximately 20% of screen reader users

4. **TalkBack** - Android
   - Built into Android devices
   - Activate: Settings > Accessibility > TalkBack

## Basic Screen Reader Commands

### NVDA (Windows)

- Start/Stop: NVDA+Q
- Read current line: NVDA+Up Arrow
- Read from current position: NVDA+Down Arrow
- Navigate by headings: H
- Navigate by landmarks: D
- Navigate by links: K
- Navigate by form controls: F
- List all headings: NVDA+F7
- List all landmarks: NVDA+F7 (then select landmarks)

### VoiceOver (macOS)

- Start/Stop: Command+F5
- Read current line: VO+L (VO = Control+Option)
- Read from current position: VO+A
- Navigate by headings: VO+Command+H
- Navigate by landmarks: VO+Command+L
- Navigate by links: VO+Command+G
- Navigate by form controls: VO+Command+J
- List all headings: VO+U, then use arrow keys to select headings
- List all landmarks: VO+U, then use arrow keys to select landmarks

### JAWS (Windows)

- Start/Stop: Insert+F4
- Read current line: Insert+Up Arrow
- Read from current position: Insert+Down Arrow
- Navigate by headings: H
- Navigate by landmarks: R
- Navigate by links: Tab
- Navigate by form controls: F
- List all headings: Insert+F6
- List all landmarks: Insert+F3

## Testing Checklist

### 1. Page Structure and Navigation

- [ ] Verify that the page title is descriptive and accurate
- [ ] Verify that headings are properly structured (H1 → H2 → H3, etc.)
- [ ] Verify that landmarks (header, main, navigation, footer) are properly identified
- [ ] Verify that the skip to content link works correctly
- [ ] Verify that keyboard focus order is logical and follows the visual layout

### 2. Text and Images

- [ ] Verify that all images have appropriate alt text
- [ ] Verify that decorative images have empty alt text (alt="")
- [ ] Verify that complex images have detailed descriptions
- [ ] Verify that text contrast is sufficient for readability
- [ ] Verify that text can be resized without loss of content or functionality

### 3. Interactive Elements

- [ ] Verify that all buttons and links have descriptive text
- [ ] Verify that form fields have proper labels
- [ ] Verify that form validation errors are announced
- [ ] Verify that required fields are properly indicated
- [ ] Verify that custom components (dropdowns, tabs, etc.) are accessible

### 4. Dynamic Content

- [ ] Verify that status messages are announced
- [ ] Verify that modal dialogs trap focus correctly
- [ ] Verify that content updates are announced
- [ ] Verify that loading states are announced

## Testing Methodology

### 1. Full Page Read-Through

Start at the top of the page and let the screen reader read through the entire page without interruption. This will give you a sense of how a screen reader user would experience the page.

### 2. Navigation Testing

Test navigation using the screen reader's navigation commands (headings, landmarks, links, form controls). Verify that all important content can be accessed through these navigation methods.

### 3. Interactive Element Testing

Test all interactive elements (buttons, links, form fields) to ensure they can be accessed and operated using the screen reader.

### 4. Task-Based Testing

Perform common tasks on the website using only the screen reader and keyboard. For example:
- Navigate to the contact page and fill out the contact form
- Read an insight article
- Toggle between light and dark mode
- Navigate through the main menu

## Common Issues to Watch For

1. **Missing Alt Text**: Images without alt text will be announced as "image" or "graphic" without any description.

2. **Improper Heading Structure**: Headings should be properly nested (H1 → H2 → H3) and should not skip levels.

3. **Unlabeled Form Fields**: Form fields without labels will be announced as "edit" or "text field" without any context.

4. **Inaccessible Custom Components**: Custom components like dropdowns, tabs, and accordions may not be accessible to screen readers if not properly implemented.

5. **Keyboard Traps**: Elements that trap keyboard focus and prevent users from navigating away.

6. **Timing Issues**: Content that changes or disappears too quickly for screen reader users to process.

## Reporting Issues

When reporting accessibility issues found during screen reader testing, include the following information:

1. **Screen Reader Used**: Specify which screen reader and version you used.
2. **Browser Used**: Specify which browser and version you used.
3. **Operating System**: Specify which operating system and version you used.
4. **Issue Description**: Describe the issue in detail, including what you expected to happen and what actually happened.
5. **Steps to Reproduce**: Provide step-by-step instructions to reproduce the issue.
6. **Severity**: Rate the severity of the issue (Critical, High, Medium, Low).
7. **Recommendation**: Suggest a solution if possible.

## Resources

- [WebAIM Screen Reader User Survey](https://webaim.org/projects/screenreadersurvey9/)
- [NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [JAWS Documentation](https://support.freedomscientific.com/documentation/jaws)
- [TalkBack User Guide](https://support.google.com/accessibility/android/answer/6283677)
- [W3C WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
