import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// resolve - TypeError: Cannot read properties of undefined (reading 'addListener')
// when ant design are used
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  };

// resolve - TypeError: window.matchMedia is not a function in Vitest
// but don't work when ant design are used
// ------------------------------------------------------------------
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: vi.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: vi.fn(), // deprecated
//     removeListener: vi.fn(), // deprecated
//     addEventListener: vi.fn(),
//     removeEventListener: vi.fn(),
//     dispatchEvent: vi.fn(),
//   })),
// });
