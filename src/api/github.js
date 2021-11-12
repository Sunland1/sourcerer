import {gql} from "@apollo/client";

export const GET_REPO = gql`
    query getRepo {
        viewer {
            repositories(first: 100) {
            nodes {
                name
                description
                languages(first: 5) {
                    nodes {
                        color
                        name
                    }
                }
                collaborators {
                    totalCount
                    nodes {
                        avatarUrl
                        name
                    }
                }
            }
            }
            contributionsCollection {
                commitContributionsByRepository {
                    contributions {
                        totalCount
                    }
                    repository {
                        name
                    }
                }
                }
        }
    }
`



export const GET_REPO_LOC = gql`
    query getRepoLoc {
        viewer {
            repositories(first: 100) {
            nodes {
                object(expression: "HEAD:") {
                ... on Tree {
                    id
                    entries {
                    object {
                        ... on Blob {
                        id
                        text
                        }
                    }
                    }
                }
                }
            }
            }
        }
        }

`


export const GET_VIEWER = gql`
    query getViewer{
        viewer {
            login
            avatarUrl
            repositories {
                totalCount
            }
            followers {
                totalCount
            }
            following {
                totalCount
            }
            contributionsCollection {
                totalCommitContributions
            }
        }
    }
`