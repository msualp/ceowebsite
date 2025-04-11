'use client';

import React, { ReactNode, ElementType } from 'react';

interface LandmarkProps {
  children: ReactNode;
  role?: 'banner' | 'navigation' | 'main' | 'complementary' | 'contentinfo' | 'search' | 'form';
  label?: string;
  className?: string;
  id?: string;
}

/**
 * Landmark component for adding semantic ARIA landmarks to sections
 * 
 * @param role - The ARIA role for the landmark (banner, navigation, main, complementary, contentinfo, search, form)
 * @param label - An optional aria-label for the landmark
 * @param className - Additional CSS classes
 * @param id - Optional ID for the landmark
 * @param children - Child elements
 */
export default function Landmark({
  children,
  role,
  label,
  className = '',
  id
}: LandmarkProps) {
  // If no role is provided, just render a div
  if (!role) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  // Map ARIA roles to HTML elements
  const elementMap: Record<string, ElementType> = {
    banner: 'header',
    navigation: 'nav',
    main: 'main',
    complementary: 'aside',
    contentinfo: 'footer',
    search: 'div',
    form: 'form'
  };

  // Get the appropriate HTML element for the role
  const Element = elementMap[role];

  // For roles that don't have a direct HTML element mapping, add the role attribute
  const needsRoleAttribute = role === 'search';

  return (
    <Element
      className={className}
      id={id}
      {...(needsRoleAttribute && { role })}
      {...(label && { 'aria-label': label })}
    >
      {children}
    </Element>
  );
}

/**
 * Header landmark component
 */
export function Header({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="banner" label={label} className={className} id={id}>
      {children}
    </Landmark>
  );
}

/**
 * Navigation landmark component
 */
export function Navigation({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="navigation" label={label} className={className} id={id}>
      {children}
    </Landmark>
  );
}

/**
 * Main landmark component
 */
export function Main({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="main" label={label} className={className} id={id}>
      {children}
    </Landmark>
  );
}

/**
 * Complementary landmark component (sidebar)
 */
export function Aside({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="complementary" label={label} className={className} id={id}>
      {children}
    </Landmark>
  );
}

/**
 * Footer landmark component
 */
export function Footer({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="contentinfo" label={label} className={className} id={id}>
      {children}
    </Landmark>
  );
}

/**
 * Search landmark component
 */
export function Search({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="search" label={label || 'Search'} className={className} id={id}>
      {children}
    </Landmark>
  );
}

/**
 * Form landmark component
 */
export function Form({ children, label, className = '', id }: Omit<LandmarkProps, 'role'>) {
  return (
    <Landmark role="form" label={label} className={className} id={id}>
      {children}
    </Landmark>
  );
}
