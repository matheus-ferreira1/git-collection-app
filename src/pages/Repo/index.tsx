import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../services/api";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Header, Issues, RepoInfo } from "./styles";

type RepoParams = {
  repository: string;
};

interface GithubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repo: React.FC = () => {
  const [repo, setRepo] = useState<GithubRepository | null>(null);
  const [issues, setIssues] = useState<GithubIssue[]>([]);

  const { repository } = useParams<RepoParams>();

  useEffect(() => {
    api.get(`repos/${repository}`).then((response) => setRepo(response.data));

    api
      .get(`repos/${repository}/issues`)
      .then((response) => setIssues(response.data));
  }, [repository]);

  return (
    <>
      <Header>
        <h2>GitCollection</h2>
        <Link to="/">
          <FiChevronLeft />
          Go back
        </Link>
      </Header>

      {repo && (
        <RepoInfo>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />

            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Open issues</span>
            </li>
          </ul>
        </RepoInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a href={issue.html_url} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repo;
