import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Banner from '../components/Banner/components/LogoParticle';
import Layout from '@theme/Layout';
import './index.scss'
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main className=''>
        <Banner></Banner>
      </main>
    </Layout>
  );
}
