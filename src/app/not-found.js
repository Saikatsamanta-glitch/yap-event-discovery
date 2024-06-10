'use client';
import { Button, Flex } from '@/components';
import Illustration from '@/components/Illustration';

const NotFound = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="empty-screen"
    >
      <Illustration
        src="404"
        alt="Not Found"
        dataQaSelector="error_page_illustration"
      />
      <div className="empty-screen__info">
        <h3
          className="empty-screen__heading"
          data-qa-selector="error_page_title_label"
        >
          Not Found
        </h3>
        <p
          className="empty-screen__subheading"
          data-qa-selector="error_page_description_label"
        >
          The page you’re looking for does not exist
        </p>
        <Button
          onClick={() => (location.href = '/')}
          dataQaSelector="error_page_go_home"
        >
          Go Home
        </Button>
      </div>
    </Flex>
  );
};

export default NotFound;
