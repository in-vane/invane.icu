export const style = `.command {
  height: 62%;
}

.style {
  padding: 16px;
  overflow: auto;
  height: 38%;
  margin-top: 16px;
}

.style pre {
  overflow: auto;
  font-family: monospace;
  white-space: pre-wrap;
  outline: 0;
  margin: 0;
}

body {
  background: var(--main-color);
}

.style,
.command {
  background: #434343;
}

.command,
.input,
.style {
  color: #fff !important;
}

.ls-folder {
  color: #69c0ff !important;
}

.selector {
  color: #e9c171;
}

.selector .key {
  color: #64d5ea;
}

.key {
  color: #64d5ea;
}

.value {
  color: #cf9518;
  text-shadow: 0px 0px 4px;
}

.value.px {
  color: #f92772;
}

.command::-webkit-scrollbar,
.style::-webkit-scrollbar,
.expand::-webkit-scrollbar {
  background: #595959;
  width: 8px;
}

.command::-webkit-scrollbar-thumb,
.style::-webkit-scrollbar-thumb,
.expand::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #8c8c8c;
}

.left {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  box-sizing: border-box;
}

.left {
  width: 30%;
}

.right {
  height: 100%;
  width: 70%;
  box-sizing: border-box;
  margin-left: 16px;
}

.style:hover,
.command:hover,
.expand:hover {
  box-shadow: 0 0 16px #bdc0ba;
}

.expand {
  background: #434343;
  padding: 16px;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  word-wrap: break-word;
}

.left {
  transform-origin: left;
  transform: rotateY(8deg);
}

.right {
  transform-origin: right;
  transform: rotateY(-3.5deg);
}
`;
