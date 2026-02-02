import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import './SocialShare.css';

const SocialShare = ({ url, title, description }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this amazing recipe!';
  
  return (
    <div className="social-share">
      <h4>Share this recipe:</h4>
      <div className="share-buttons">
        <FacebookShareButton url={shareUrl} quote={shareTitle}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        
        <WhatsappShareButton url={shareUrl} title={shareTitle} separator=" - ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SocialShare;