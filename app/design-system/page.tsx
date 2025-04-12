import DesignSystem from '@/components/DesignSystem';
import PageContainer from '@/components/PageContainer';

export const metadata = {
  title: 'Design System | Mustafa Sualp',
  description: 'A comprehensive design system for Mustafa Sualp\'s personal brand website, showcasing consistent UI elements and animations.',
};

export default function DesignSystemPage() {
  return (
    <PageContainer title="Design System">
      <DesignSystem />
    </PageContainer>
  );
}
