import styled from 'styled-components';

export const ParentalGuidanceCells = styled.div`
  width: 225.5px;
  margin-inline: 50px;
`;

export const IconRating = styled.img`
  float: left;
  margin-right: 14px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Message = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  height: 24px;
  line-height: 24px;
`;

export const RowElement = styled.td`
  .vl {
    position: fixed;
    z-index: 2;
    width: 100%;
    height: 3px;
    background-color: var(--color-system-2);
  }
  .plus {
    position: fixed;
    height: 100%;
    display: inline-block;
    vertical-align: baseline;
    font-weight: bold;
    vertical-align: top;
    cursor: pointer;
    z-index: 3;
    margin-top: -12px;
    left: calc(50% - 59px);
    width: fit-content;
    height: 25px;
    border-radius: 5px;
    background-color: var(--color-system-2);
    padding: 2.5px 5px 5px 5px;
  }
  /////////////////////Adapted///////////////////////
  /*
  * Copyright (c) 2012 Thibaut Courouble
  * http://www.webinterfacelab.com
  *
  * Licensed under the MIT License:
  * http://www.opensource.org/licenses/mit-license.php
  */
  .plus:hover ul {
    visibility: visible;
    opacity: 1;
    padding: 4px 0 6px;
  }
  .plus ul {
    visibility: hidden;
    position: absolute;
    margin-top: 6px;
    width: fit-content;
    top: 100%;
    left: -12.5px;
    right: 0;
    border-radius: 5px;
    background-color: var(--color-neutral-2);
    -webkit-box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.9),
      0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.9),
      0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .plus ul:before,
  .plus ul:after,
  .plus li:first-child:after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 60px;
    border: 7px outset transparent;
  }
  .plus ul:before {
    border-bottom: 7px solid #555;
    top: -14px;
  }
  .plus li:first-child:after {
    border-bottom: 7px solid var(--color-neutral-2);
    top: -13px;
  }
  .plus ul:after {
    border-bottom: 7px solid #eef3fe;
    top: -12px;
  }
  .plus li {
    padding: 0 12px;
    font-size: 11px;
    color: var(--color-neutral-3);
    list-style-type: none;
  }
  .plus li.sep {
    border-top: 1px solid #b4bbce;
    padding-top: 4px;
    margin-top: 4px;
    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.6);
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.6);
  }
  .plus li div {
    display: block;
    position: relative;
    margin: 0 -13px;
    padding: 0 20px 0 12px;
    color: var(--color-neutral-1);
    border: 1px solid transparent;
  }
  .plus li div:hover {
    color: var(--color-neutral-2);
    text-decoration: none;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    border-color: var(--color-primary-2) #495d98 #42558a;
    background-color: var(--color-primary-2);
  }
  .plus li div:hover:after {
    display: block;
  }
  .plus li div:after {
    display: none;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    right: 5px;
    margin-top: -4px;
    border: 4px solid transparent;
    border-left-color: #9facd1;
    border-left-color: rgba(255, 255, 255, 0.4);
  }
  ///////////////////////////////////////////////////
`;

export const AddToList = styled.div`
  display: none;
  svg {
    color: var(--color-neutral-2);
    width: 15px;
    height: 50px;
    position: relative;
    margin-left: 15px;
    vertical-align: middle;
    z-index: 3;
    cursor: pointer;
    :hover {
      color: var(--color-neutral-3);
    }
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-left: 2px;
  min-width: 20px;
`;

export const MessagesContainer = styled.div`
  min-width: 30px;
  max-width: 30px;
`;

export const ValidationMessage = styled.div`
  position: absolute;
  transform: scale(0.75);
  margin-top: -20px;
`;

export const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
