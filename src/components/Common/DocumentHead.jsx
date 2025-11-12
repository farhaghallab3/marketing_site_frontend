// src/components/Common/DocumentHead.jsx
import React, { useEffect } from 'react';

const DocumentHead = ({ title, description, keywords }) => {
  const defaultTitle = 'Vivora Agency - وكالة فيفورا للتصميم';
  const defaultDescription = 'وكالة فيفورا للتصميم - نصنع هويات بصرية مذهلة تساعد الشركات على التميز. تصميم شعارات، هويات علامات تجارية، ومواقع إلكترونية.';
  const defaultKeywords = 'تصميم, شعارات, هوية بصرية, مواقع إلكترونية, فيفورا, Vivora Agency, تصميم جرافيك';

  useEffect(() => {
    // Update document title
    document.title = title || defaultTitle;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || defaultDescription;
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords || defaultKeywords;
    
    // Cleanup function
    return () => {
      document.title = defaultTitle;
    };
  }, [title, description, keywords]);

  return null;
};

export default DocumentHead;