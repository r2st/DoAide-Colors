import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('Home page', () => {
  it('renders the title and tool links', () => {
    renderAt('/');
    expect(screen.getAllByText('Colors').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Color Palette Generator')).toBeInTheDocument();
    expect(screen.getByText('Contrast Checker')).toBeInTheDocument();
    expect(screen.getByText('Gradient Generator')).toBeInTheDocument();
    expect(screen.getByText('Color Converter')).toBeInTheDocument();
  });
});

describe('Palette Generator', () => {
  it('renders palette page', () => {
    renderAt('/palette');
    expect(screen.getByText('Color Palette Generator')).toBeInTheDocument();
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });
});

describe('Contrast Checker', () => {
  it('renders contrast page with WCAG results', () => {
    renderAt('/contrast');
    expect(screen.getByText('Contrast Checker')).toBeInTheDocument();
    expect(screen.getByText('WCAG Results')).toBeInTheDocument();
  });
});

describe('Gradient Generator', () => {
  it('renders gradient page', () => {
    renderAt('/gradient');
    expect(screen.getByText('Gradient Generator')).toBeInTheDocument();
    expect(screen.getByText('CSS Code')).toBeInTheDocument();
  });
});

describe('Color Converter', () => {
  it('renders converter page with format buttons', () => {
    renderAt('/converter');
    expect(screen.getByText('Color Converter')).toBeInTheDocument();
    expect(screen.getAllByText('HEX').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('RGB').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('HSL').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('CMYK').length).toBeGreaterThanOrEqual(1);
  });
});

describe('Blog', () => {
  it('renders blog index with post titles', () => {
    renderAt('/blog');
    expect(screen.getByText(/WCAG Color Contrast/)).toBeInTheDocument();
    expect(screen.getByText(/Color Theory for UI Design/)).toBeInTheDocument();
    expect(screen.getByText(/CSS Gradients/)).toBeInTheDocument();
  });

  it('renders WCAG blog post', () => {
    renderAt('/blog/wcag-color-contrast-guide');
    expect(screen.getByText(/What Is Color Contrast Ratio/)).toBeInTheDocument();
  });

  it('renders color theory blog post', () => {
    renderAt('/blog/color-theory-for-ui-design');
    expect(screen.getByText(/The Color Wheel and HSL/)).toBeInTheDocument();
  });

  it('renders CSS gradients blog post', () => {
    renderAt('/blog/css-gradients-complete-guide');
    expect(screen.getByText(/Linear Gradients/)).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('renders nav links in Layout', () => {
    renderAt('/');
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Palette')).toBeInTheDocument();
  });
});
