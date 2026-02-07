import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const SocialShare = ({ url, title, description }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this amazing recipe!';
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h4 className="text-lg font-medium mb-3 text-gray-800">Share this recipe:</h4>
      <div className="flex gap-3">
        <FacebookShareButton url={shareUrl} quote={shareTitle} className="hover:scale-110 transition-transform">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        
        <TwitterShareButton url={shareUrl} title={shareTitle} className="hover:scale-110 transition-transform">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        
        <WhatsappShareButton url={shareUrl} title={shareTitle} separator=" - " className="hover:scale-110 transition-transform">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SocialShare;