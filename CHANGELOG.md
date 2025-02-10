# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - 2025-02-dd

### Added
- Introduced a basic UI component library that should be available for any application.
- Based on Web Components from [Shoelace (formerly Web Awesome)](https://github.com/shoelace-style/shoelace).
- Custom elements prefixed with `virto-`, following Virto's design guidelines.

- Implemented the following components:
  - **Avatar** (`<virto-avatar>`) - Displays a user's avatar.
  - **Button** (`<virto-button>`) - Standard button component with customizable styles.
  - **Card** (`<virto-card>`) - Basic card layout for content presentation.
  - **Checkbox** (`<virto-checkbox>`) - Custom checkbox component (styling improvements pending).
  - **Dropdown** (`<virto-dropdown>`) - Selectable dropdown menu.
  - **Icon Button** (`<virto-icon-button>`) - Button with an integrated icon.
  - **Input** (`<virto-input>`) - Standard input field for text entry.
  - **Switch** (`<virto-switch>`) - Toggle switch component.
  - **Tag** (`<virto-tag>`) - Label-like component for categorization.
  - **Textarea** (`<virto-textarea>`) - Multi-line text input.

### Changed
- **Checkbox** (`<virto-checkbox>`) requires styling fixes.  
- **Main bundle strategy** is under discussion (current output: `main.js` includes all component imports).  
- **Component review needed** for finalizing specifications and potential improvements.  

### Fixed
_(No fixes yet, will be updated as necessary.)_

---

## [0.0.1] - 2025-02-10

### Added
- Initial release of the Virto Components library.
- First set of implemented components.
- Web Component-based architecture.

### Changed
- _(No changes, as this is the first version.)_

### Fixed
- _(No fixes, as this is the first version.)_
