import CMS from 'netlify-cms-app';
import * as TagWidget from './TagWidget';

/**
 * Register custom widgets with Netlify CMS
 */
export function registerWidgets() {
  // Register the custom tag widget
  CMS.registerWidget('categorized-tags', TagWidget.Control, TagWidget.Preview);
  
  // Update the tags field in the config to use our custom widget
  const collections = CMS.getBackend().collections;
  
  collections.forEach(collection => {
    const fields = collection.get('fields');
    
    fields.forEach(field => {
      // Find tag fields and update them to use our custom widget
      if (field.get('name') === 'tags') {
        field.set('widget', 'categorized-tags');
      }
    });
  });
  
  console.log('Custom widgets registered successfully');
}
