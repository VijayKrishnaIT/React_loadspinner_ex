import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { userAPI } from "./api/userAPI";
import { postAPI } from "./api/postAPI";
import { UserTable, PostTable, LoadButton } from "./components";
import "./App.css";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      posts: [],
    };

    this.onLoadTables = this.onLoadTables.bind(this);
  }

  onLoadTables() {
    this.setState({
      users: [],
      posts: [],
    });

    trackPromise(
      userAPI.fetchUsers().then((users) => {
        this.setState({
          users,
        });
      })
    );

    trackPromise(
      postAPI.fetchPosts().then((posts) => {
        this.setState({
          posts,
        });
      })
    );
  }

  render() {
    return (
      <div>
        <LoadButton onLoad={this.onLoadTables} title="Load tables with delay" />
        <div className="tables">
          <UserTable users={this.state.users} />
          <PostTable posts={this.state.posts} />
        </div>
      </div>
    );
  }
}
