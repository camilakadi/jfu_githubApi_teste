import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from "date-fns";

import './styles.css';

export interface Repos {
    id: number;
    name: string;
    created_at: Date;
    description: string;
    language: string;
};

function Home() {
    const searchIconStyle = {
        stroke: "none",
        fill: "#ccc",
        backgroundColor: "transparent"
    };

    const [repos, setRepos] = useState([]);
    const [search, setSearch] = useState('');

    async function pesquisarGitHub(e: FormEvent) {
        e.preventDefault();

        if (search) {
            try {
                let retorno = await axios.get(`https://api.github.com/users/${search}/repos`);
                if (retorno.data)
                    setRepos(retorno.data);
            }
            catch (error) {
                alert('Nome de usuário inexistente!');
            }
        }
        else {
            alert('Necessário digitar um nome de usuário');
        }


    }

    return (
        <div id="wrapper">
            <header>
                <div className="logo">GitHub Viewer</div>
                <nav className="menu">
                    <ul>
                        <li>oi</li>
                        <li>oi5</li>
                    </ul>
                </nav>
            </header>

            <main>

                <div className="searchs">
                    <form className="searchs__form" onSubmit={pesquisarGitHub}>
                        <fieldset>
                            <input type="text" id="search" name="search" className="searchs__input" value={search}
                                onChange={(e) => {setSearch(e.target.value)}}
                            />
                        </fieldset>
                        <button className="searchs__button">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-1 0 136 136.21852">
                                <g id="surface1">
                                    <path d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 "
                                        style={searchIconStyle}
                                    />
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>nome</th>
                                <th>criado em</th>
                                <th>descrição</th>
                                <th>linguagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                repos.map((repo: Repos) => {
                                    return(
                                        <tr key={repo.id}>
                                            <td>{repo.id}</td>
                                            <td>{repo.name}</td>
                                            <td>{format(new Date(repo.created_at), 'dd/MM/yyyy')}</td>
                                            <th>{repo.description}</th>
                                            <td>{repo.language}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default Home;