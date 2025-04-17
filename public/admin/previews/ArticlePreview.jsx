import React from 'react';
import ArticleCard from '../../../components/blog/ArticleCard';
import { formatDate } from '../../../utils/blog-styles';

/**
 * ArticlePreview component for Netlify CMS
 * This component shows a preview of how the article will look when published
 */
const ArticlePreview = ({ entry, getAsset, widgetFor }) => {
  // Get the entry data
  const data = entry.getIn(['data']).toJS();
  
  // Format the article data
  const article = {
    title: data.title || 'Untitled Article',
    slug: entry.getIn(['slug']) || 'untitled-article',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || 'No excerpt provided',
    category: data.category || 'uncategorized',
    author: data.author || 'Mustafa Sualp',
    authorTitle: data.authorTitle || 'Founder & CEO',
    authorImage: data.authorImage ? getAsset(data.authorImage).toString() : null,
    readTime: data.readTime || '5 min read',
    image: data.image ? getAsset(data.image).toString() : null,
    imageAlt: data.imageAlt || data.title || 'Article image',
    tags: data.tags || [],
    featured: data.featured || false
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Article Preview</h2>
        <p className="text-gray-600 mb-2">This is how your article will appear in the article list:</p>
      </div>
      
      {/* Preview as ArticleCard */}
      <div className="mb-12">
        <ArticleCard
          article={article}
          variant="default"
          showImage={true}
          showTags={true}
          showDate={true}
          showReadTime={true}
          showCategory={true}
          showExcerpt={true}
        />
      </div>
      
      {/* Preview as full article */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Full Article Preview</h2>
        <p className="text-gray-600 mb-6">This is how your full article will appear:</p>
      </div>
      
      <div className="prose max-w-none dark:prose-invert">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-4">{formatDate(article.date)}</span>
            {article.readTime && (
              <span className="text-gray-600 mr-4">{article.readTime}</span>
            )}
            {article.category && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {article.category}
              </span>
            )}
          </div>
          
          {article.image && (
            <div className="mb-6">
              <img 
                src={article.image} 
                alt={article.imageAlt} 
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          {article.excerpt && (
            <div className="text-lg font-medium text-gray-700 mb-6">
              {article.excerpt}
            </div>
          )}
        </div>
        
        {/* Article body */}
        <div className="article-body">
          {widgetFor('body')}
        </div>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Author info */}
        {article.author && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              {article.authorImage && (
                <img 
                  src={article.authorImage} 
                  alt={article.author} 
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <h3 className="font-bold">{article.author}</h3>
                {article.authorTitle && (
                  <p className="text-gray-600">{article.authorTitle}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;
