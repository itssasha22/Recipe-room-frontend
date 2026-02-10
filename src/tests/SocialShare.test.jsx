import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SocialShare from '../components/SocialShare';

// Mock react-share components
vi.mock('react-share', () => ({
  FacebookShareButton: ({ children, ...props }) => (
    <button data-testid="facebook-share" {...props}>{children}</button>
  ),
  TwitterShareButton: ({ children, ...props }) => (
    <button data-testid="twitter-share" {...props}>{children}</button>
  ),
  WhatsappShareButton: ({ children, ...props }) => (
    <button data-testid="whatsapp-share" {...props}>{children}</button>
  ),
  EmailShareButton: ({ children, ...props }) => (
    <button data-testid="email-share" {...props}>{children}</button>
  ),
  FacebookIcon: () => <div>FacebookIcon</div>,
  TwitterIcon: () => <div>TwitterIcon</div>,
  WhatsappIcon: () => <div>WhatsappIcon</div>,
  EmailIcon: () => <div>EmailIcon</div>,
}));

describe('SocialShare Component', () => {
  const mockProps = {
    url: 'https://example.com/recipe/1',
    title: 'Delicious Pasta Recipe',
    description: 'A wonderful Italian pasta dish',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    });
  });

  it('renders social share section', () => {
    render(<SocialShare {...mockProps} />);
    
    expect(screen.getByText('Share this recipe:')).toBeInTheDocument();
  });

  it('renders all social media share buttons', () => {
    render(<SocialShare {...mockProps} />);
    
    expect(screen.getByTestId('facebook-share')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-share')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-share')).toBeInTheDocument();
    expect(screen.getByTestId('email-share')).toBeInTheDocument();
  });

  it('renders copy link input with URL', () => {
    render(<SocialShare {...mockProps} />);
    
    const input = screen.getByDisplayValue(mockProps.url);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('readonly');
  });

  it('renders copy button', () => {
    render(<SocialShare {...mockProps} />);
    
    const copyButton = screen.getByTestId('copy-link-button');
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveTextContent('Copy');
  });

  it('copies URL to clipboard when copy button is clicked', async () => {
    render(<SocialShare {...mockProps} />);
    
    const copyButton = screen.getByTestId('copy-link-button');
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockProps.url);
    });
  });

  it('shows success message after copying', async () => {
    render(<SocialShare {...mockProps} />);
    
    const copyButton = screen.getByTestId('copy-link-button');
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(screen.getByText('Link copied to clipboard!')).toBeInTheDocument();
      expect(copyButton).toHaveTextContent('Copied!');
    });
  });

  it('resets success message after timeout', async () => {
    vi.useFakeTimers();
    render(<SocialShare {...mockProps} />);
    
    const copyButton = screen.getByTestId('copy-link-button');
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copied!');
    });
    
    // Fast-forward time
    vi.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(copyButton).toHaveTextContent('Copy');
    });
    
    vi.useRealTimers();
  });

  it('uses default URL when not provided', () => {
    delete window.location;
    window.location = new URL('https://recipe-room.com/recipe/123');
    
    render(<SocialShare title="Test Recipe" description="Test Description" />);
    
    const input = screen.getByDisplayValue('https://recipe-room.com/recipe/123');
    expect(input).toBeInTheDocument();
  });

  it('uses default title when not provided', () => {
    render(<SocialShare url="https://example.com" />);
    
    // Component should still render with default title
    expect(screen.getByText('Share this recipe:')).toBeInTheDocument();
  });

  it('selects text when input is clicked', () => {
    render(<SocialShare {...mockProps} />);
    
    const input = screen.getByDisplayValue(mockProps.url);
    const selectSpy = vi.spyOn(input, 'select');
    
    fireEvent.click(input);
    
    expect(selectSpy).toHaveBeenCalled();
  });

  it('handles copy failure gracefully', async () => {
    // Mock clipboard to fail
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.reject(new Error('Copy failed'))),
      },
    });
    
    // Spy on console.error to prevent test output pollution
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<SocialShare {...mockProps} />);
    
    const copyButton = screen.getByTestId('copy-link-button');
    fireEvent.click(copyButton);
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
    
    consoleErrorSpy.mockRestore();
  });

  it('displays share tip', () => {
    render(<SocialShare {...mockProps} />);
    
    expect(screen.getByText(/Share this recipe with friends/)).toBeInTheDocument();
  });

  it('has proper ARIA labels for accessibility', () => {
    render(<SocialShare {...mockProps} />);
    
    expect(screen.getByLabelText('Share on Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on WhatsApp')).toBeInTheDocument();
    expect(screen.getByLabelText('Share via Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy link to clipboard')).toBeInTheDocument();
  });
});
