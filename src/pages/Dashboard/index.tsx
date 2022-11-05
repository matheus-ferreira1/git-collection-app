import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { api } from "../../services/api";
import { Wrapper, Title, Form, Repos, Error } from "./styles";

import logo from "../../assets/logo.svg";

interface GihubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GihubRepository[]>(() => {
    const storageRepos = localStorage.getItem("@GitCollection:repositories");

    return storageRepos ? JSON.parse(storageRepos) : [];
  });
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    localStorage.setItem("@GitCollection:repositories", JSON.stringify(repos));
  }, [repos]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewRepo(event.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Please enter an username and repo");
      return;
    }

    const response = await api.get<GihubRepository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepos([...repos, repository]);
    setNewRepo("");
    setInputError("");
  };

  return (
    <Wrapper>
      {/* <img src={logo} alt="GitCollection" /> */}
      <Title>GitHub Repositories</Title>
      <Form hasError={Boolean(inputError)} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username/repository_name"
          onChange={handleInputChange}
          value={newRepo}
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map((repository) => (
          <a href="/repositories" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </Wrapper>
  );
};
