import React from 'react';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Layout component to set the page title and wrap the content inside a main container.
 * @param {string} title - The title of the page (displayed in the browser tab).
 * @param {React.ReactNode} children - The page's content to be rendered inside the layout.
 */
const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
       
      <main>{children}</main>
    </div>
  );
};

/**
 * Container component to center content with padding and responsiveness.
 * @param {React.ReactNode} children - Content to be wrapped inside the container.
 */
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

/**
 * NotFoundPage component to display a 404 error message when the page is not found.
 */
const NotFoundPage: React.FC = () => {
  return (
    <Layout title="404 Not Found">
      <Container>
        <div className="min-h-[100vh] flex items-center justify-center">
          <div className="mt-16 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">404</h1>
            <p className="text-lg mt-4 text-slate-600">Page not found.</p>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
