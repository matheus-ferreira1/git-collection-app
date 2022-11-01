import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repos } from "./styles";

import logo from "../../assets/logo.svg";

export const Dashboard: React.FC = () => {
  return (
    <>
      {/* <img src={logo} alt="GitCollection" /> */}
      <Title>GitHub Repositories</Title>
      <Form>
        <input type="text" placeholder="username/repository_name" />
        <button type="submit">Search</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img src="" alt="Repository" />
          <div>
            <strong>matheus-ferreira1/git-collection-app</strong>
            <p>This is a mock repository, just temporary</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
