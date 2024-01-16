export default function DeployButton() {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkilingzhang%2Fone-saas%2Ftree%2Fmain%26project-name%3Done-saas%26repository-name%3Done-saas%26demo-title%3Done-saas%26demo-description%3Done-saas%20app%26demo-url%3Dhttps%3A%2F%2Fone-saas.vercel.app%26external-id%3Dhttps%3A%2F%2Fgithub.com%2Fkilingzhang%2Fone-saas%2Ftree%2Fmain%26demo-image%3Dhttps%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png%26integration-ids%3Doac_VqOgBHqhEoFTPzGkPd7L0iH6"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        aria-label="Vercel logomark"
        role="img"
        viewBox="0 0 74 64"
        className="h-4 w-4 mr-2"
      >
        <path
          d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
          fill="currentColor"
        ></path>
      </svg>
      Deploy to Vercel
    </a>
  );
}
