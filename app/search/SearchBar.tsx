import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Form,
  useLocation,
  useNavigate,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const submit = useSubmit();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Form
      autoComplete="off"
      onChange={(e) => {
        const isSearchRoute = location.pathname === "/search";
        const formData = new FormData(e.currentTarget);
        const trimmedKeyword = formData.get("keyword")?.toString().trim();
        if (trimmedKeyword) {
          formData.set("keyword", trimmedKeyword);
          submit(formData, { action: "/search", replace: isSearchRoute });
        } else if (isSearchRoute) {
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<SearchIcon />}
        />
        <Input
          placeholder="Search..."
          name="keyword"
          defaultValue={keyword}
          type="search"
        />
      </InputGroup>
    </Form>
  );
}
