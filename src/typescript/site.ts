/*
 * Site variables and functions (dynamic)
 * Created by Andrew Ogden
 */

/*
 *  Imports
 */

/*
 *   Properties
 */
export let isHomePage: boolean = true;

/*
 *  Functions
 */
// We do this so that we can hide the index page layout
export function setHome(arg: boolean) : void {
  isHomePage = arg;
}
// Set the tab bar title
export function setTitle(arg: string) : void {
  document.title = arg + " - vNAAATS";
}
