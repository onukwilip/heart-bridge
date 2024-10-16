import { usePathname } from "next/navigation";

/**
 * * Hook responsible for returning the current page from the URL
 * @example '/dashbard/projects' --> 'projects'
 * @example '/dashbard/projects/project' --> 'project'
 * @example '/dashbard' --> 'dashboard'
 * @example '/dashbard/projects?id=128288&user=prince' --> 'projects'
 * @returns The current page from the URL
 */
const usePageName = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const current_page_name =
    segments[segments.length - 1] === ""
      ? segments[segments.length - 2]
      : segments[segments.length - 1];

  return current_page_name;
};

export default usePageName;
