// Welcome.stories.js|jsx

import React from 'react';
import {Welcome} from "./Welcome"
import { Card } from 'react-bootstrap';
import { Button } from '../components/Button';
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import {MemoryRouter} from 'react-router-dom';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Pages/Welcome',
  component: Welcome,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  options: {
    modules: true, // This flag enables CSS modules
  },
  loader: "css-loader",
};

const Template = (args) => 

<div>
<Card>
  <Card.Body>
    <Button {...args} />
  </Card.Body>
</Card>
</div>;

export const LoginAcreditador = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoginAcreditador.args = {
  primary: true,
  size: 'large',
  label: "Login Acreditador",
  linkTo: "/login-acreditador"
};

export const LoginAutor = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoginAutor.args = {
  primary: true,
  size: 'large',
  label: "Login Autor",
  linkTo: "/login-autor"
};

const Image = () => 
<div>
<Card>
  <Card.Body>
    <iframe src="https://giphy.com/embed/11sBLVxNs7v6WA" className="w-100"></iframe>
  </Card.Body>
</Card>
</div>;

export const WelcomeImage = Image.bind({});

const Page = () =>     
<div>
<Card>
  <Card.Body>
    <h2 className="text-center mb-4">Welcome to <strong>TRUSTIFY!</strong></h2>
    <iframe src="https://giphy.com/embed/11sBLVxNs7v6WA" className="w-100"></iframe>
    <MemoryRouter>
    <Link to="/login-acreditador" className="btn btn-primary center w-100 mt-3">
      Login Acreditador
    </Link>
    <Link to="/login-autor" className="btn btn-primary center w-100 mt-3">
      Login Autor
    </Link>
    </MemoryRouter>
  </Card.Body>
</Card>
</div>
export const FullPage = Page.bind({});

const PageTest = (args,argstwo) =>     
<Card>
  <Card.Body>
    <h2 className="text-center mb-4">Welcome to <strong>TRUSTIFY!</strong></h2>
    <iframe src="https://giphy.com/embed/11sBLVxNs7v6WA" className="w-100"></iframe>
    <MemoryRouter>
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <Button {...args} />
          <Button {...args} />
        </div>
      </div>
    </div>
    </MemoryRouter>
  </Card.Body>
</Card>

export const FullPageTest = PageTest.bind({})
FullPageTest.args = {
  primary: true,
  size: 'large',
  label: "Test Button",
  linkTo: "/login-TEST"
}
