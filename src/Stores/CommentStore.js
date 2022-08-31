import {makeAutoObservable} from "mobx";

export default class CommentStore {
  comments = [];

  constructor() {
    makeAutoObservable(this);
  }

  setComments(comments) {
    this.comments = [...comments];
  }

  addComment(comment) {
    this.comments = [...this.comments, comment];
  }

  getComments(itemId, currentUserName, timeAgo) {
    return [...this.comments]
    .filter(comment => comment.item.id === itemId)
    .map(comment => {
      return {
        key: comment.id,
        position: comment.author.username === currentUserName
            ? "right"
            : "left",
        title: comment.author.username,
        type: "text",
        text: comment.content,
        dateString: timeAgo.format(new Date(comment.createDate)),
        date: new Date(comment.createDate),
      };
    }).sort((a, b) => b.date - a.date).slice();
  }

  clearStore() {
    this.comments = [];
  }
}
