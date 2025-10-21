# Frontend Mentor - Kanban task management web app solution

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- **Bonus**: Build this project as a full-stack application

### Screenshot

![mobileLight](./public/Screenshot%202025-10-21%20at%2022-54-14%20Kanban%20Task%20Management%20Website.png)
![mobileDark](./public/Screenshot%202025-10-21%20at%2022-54-37%20Kanban%20Task%20Management%20Website.png)
![tablet](./public/Screenshot%202025-10-21%20at%2022-55-11%20Kanban%20Task%20Management%20Website.png)
![tabletHiddenSIdebar](./public/Screenshot%202025-10-21%20at%2022-55-38%20Kanban%20Task%20Management%20Website.png)
![desktopLight](./public/Screenshot%202025-10-21%20at%2022-55-58%20Kanban%20Task%20Management%20Website.png)
![desktopDark](./public/Screenshot%202025-10-21%20at%2022-56-21%20Kanban%20Task%20Management%20Website.png)

### Links

- Solution URL: [Github](https://github.com/oloude)
- Live Site URL: [Nextlify](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) - For state

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```js
function Board() {
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);

  const selectedBoardData = kanbanBoardData.boards.filter(
    (item) => item.name === selectedBoardName
  )[0];

  return (
    <section
      className={`flex gap-6 overflow-x-scroll w-full pt-10   min-h-screen pb-16 ${
        selectedBoardData.columns.length == 0 ? "px-6" : "pr-50 pl-10"
      }`}
    >
      {selectedBoardData.columns.length > 0 ? (
        <>
          {selectedBoardData.columns.map((columnData) => (
            <Column key={columnData.name} {...columnData} />
          ))}
          <EmptyColumn />{" "}
        </>
      ) : (
        <EmptyBoard />
      )}
    </section>
  );
}
```

### Continued development

Backend data management
animation(framer motion)

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Drag and drop](https://www.youtube.com/watch?v=CJycVlSuaPg) - This helped me to implement the drag and drop card feature

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/abosedeoloude)
- Twitter - [@yourusername](https://www.twitter.com/abosedeoloude)
