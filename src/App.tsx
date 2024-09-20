import { Refine, WelcomePage } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowJokes } from "./pages/jokes/show";
import { EditJokes } from "./pages/jokes/edit";
import { ListJokes } from "./pages/jokes/list";
import { CreateJokes } from "./pages/jokes/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowJokes /> */}
      {/* <EditJokes /> */}
      {/* <ListJokes /> */}
      <CreateJokes />
    </Refine>
  );
}