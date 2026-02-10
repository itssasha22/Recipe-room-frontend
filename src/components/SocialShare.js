import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const SocialShare = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this amazing recipe!';
  const shareDescription = description || 'I found this great recipe on Recipe Room!';
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };
  
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border" data-testid="social-share">
      <h4 className="text-lg font-semibold mb-3 text-gray-800">Share this recipe:</h4>
      
      {/* Social Media Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <FacebookShareButton 
          url={shareUrl} 
          quote={shareTitle}
          hashtag="#RecipeRoom"
          className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          aria-label="Share on Facebook"
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        
        <TwitterShareButton 
          url={shareUrl} 
          title={shareTitle}
          hashtags={['RecipeRoom', 'Cooking', 'Recipe']}
          className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
          aria-label="Share on Twitter"
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        
        <WhatsappShareButton 
          url={shareUrl} 
          title={shareTitle} 
          separator=" - "
          className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
          aria-label="Share on WhatsApp"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={shareTitle}
          body={`${shareDescription}\n\nCheck it out: `}
          className="hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
          aria-label="Share via Email"
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>

      {/* Copy Link Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or copy link:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.target.select()}
          />
          <button
            data-testid="copy-link-button"
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              copied
                ? 'bg-green-600 text-white focus:ring-green-500'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }`}
            aria-label="Copy link to clipboard"
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </span>
            )}
          </button>
        </div>
        
        {/* Success Message */}
        {copied && (
          <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Link copied to clipboard!
          </p>
        )}
      </div>

      {/* Share Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Share this recipe with friends and family to help them discover amazing dishes!
        </p>
      </div>
    </div>
  );
};

export default SocialShare;