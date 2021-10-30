# React Material UI Carousel

## Description

A Generic, extendible Carousel UI component for React using [Material UI](https://material-ui.com/)  
It switches between given children using a smooth animation.  
Provides next and previous buttons.
Also provides interactible bullet indicators.

For Material UI 5 support please use the links below.  
[Github Branch](https://github.com/Learus/react-material-ui-carousel/tree/material-ui-5)
[npm package](https://www.npmjs.com/package/react-material-ui-carousel/v/2.3.7-mui5)

## Live Demo

Take a look at this interactible [Live Demo](https://learus.github.io/react-material-ui-carousel)

## Installation

```shell
npm install react-material-ui-carousel --save
```

**Note:**

You will need to have Material UI installed, in order to use this library/component

```shell
npm install @mui/material
npm install @mui/icons-material
npm install @mui/styles
```

### Other Versions

```shell
# Version 2 with MUI 4
npm install react-material-ui-carousel@version2 --save
npm install @material-ui/core
npm install @material-ui/icons


# Version 2 with MUI 5 support
npm install react-material-ui-carousel@version2mui5 --save
```

## Usage Example

```jsx
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

function Example(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
```

## Next & Prev Usage

```jsx
    <Carousel
        next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`); }
        prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`); }
    >
        {...}
    </Carousel>

    // OR

    <Carousel
        next={ () => {/* Do stuff */} }
        prev={ () => {/* Do other stuff */} }
    >
        {...}
    </Carousel>

    // And so on...
```

Note: `onChange` works in a similar fashion. See [Props](#props) below.

## Customizing Navigation

### Navigation Buttons - Customizing the default solution

These are the props that are used to directly customize the Carousel's default buttons:

* NextIcon
* PrevIcon
* navButtonsProps
* navButtonsWrapperProps
* fullHeightHover

#### Example #1

Say we don't like the default icons used for the next and prev buttons
and want to change them to be an MUI Icon or an image of our own.

```jsx


import RandomIcon from '@material-ui/icons/Random'; // Note: this doesn't exist

<Carousel
    NextIcon={<RandomIcon/>}
    PrevIcon={<RandomIcon/>}
    // OR
    NextIcon={<img src="http://random.com/next"/>}
    PrevIcon={<img src="http://random.com/prev"/>}
>
    {...}
</Carousel>
```

The `NextIcon` and `PrevIcon` is of type `ReactNode`, meaning it can be any JSX element or a string. *Note: Extra styling may be needed when using those props*.

#### Example #2

Let's now say we don't like the default graphite background of the buttons, nor do we like the fact that it is round.  
We also want to place them under the main Carousel, and finally remove the arrows and have "next" and "prev" accordingly to each button.

A very important note here, is that any styles specified by the user **DO NOT OVERRIDE THE EXISTING STYLES**. They work in tandem with them. That means, that if you want to change, or get rid of a CSS attribute you will have to override it or unset it. The [Default styles](#default-styles) are given at the end of this section, and are part of the code.

```jsx
<Carousel
    fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
    navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
            backgroundColor: 'cornflowerblue',
            borderRadius: 0
        }
    }} 
    navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
            bottom: '0',
            top: 'unset'
        }
    }} 
    NextIcon='next'             // Change the "inside" of the next button to "next"
    PrevIcon='prev'             // Change the "inside of the prev button to "prev"
>
    {...}
</Carousel>
```

Of course, extra styling to the button wrappers, or indicators might be needed to achieve exactly what we may be looking for. *Note: You can also use `className` to change the styles externally*.

### Customizing the navigation buttons directly

Do directly customize/change the navigation buttons `NavButton` prop, that allows the user to take complete control of the components rendered as the navigation buttons. It should be used like this:

#### Example

```jsx
import {Button} from '@material-ui/core';

<Carousel
    NavButton={({onClick, className, style, next, prev}) => {
        // Other logic

        return (
            <Button onClick={onClick} className={className} style={style}>
                {next && "Next"}
                {prev && "Previous"}
            </Button>
        )
    }}
>
    {...}
</Carousel>
```

##### Parameters Explanation

* `onClick`: The function that handles actual navigation. If you do not add this to your component, the buttons will not work.
* `className`: The className given by the carousel component. This is used to handle Visible/Invisible, hover, and user specified styles (e.g. from navButtonProps). Apply it to the outmost element.
* `style`: The style given by the carousel component. Used to give any user specified styles (e.g. from navButtonProps).
* `next`: Boolean value that specifies whether this is the next button.
* `prev`: Boolean value that specifies whether this is the prev button.

The prop value must be a function that returns a component. All parameters are optional as far as styling goes (**not functionality**), but it is advised you use them as shown above.  
As implied, any `className`s or `style`s specified in the navButtonsProps will only be used iff you apply the given `className` and `style` parameters.

### Customizing the Indicators

There are 4 props that handle indicator customization

* IndicatorIcon
* activeIndicatorIconButtonProps
* indicatorIconButtonProps
* indicatorContainerProps

#### Example

Let's say we would like to change the indicator icon from a circle to a something else, for example a little house

```jsx
import Home from '@material-ui/icons/Home';

<Carousel
    IndicatorIcon={<Home/>}
    // OR
    IndicatorIcon={<img src="http://random.com/home"/>}
>
    {...}
</Carousel>
```

The `IndicatorIcon`  works the same way as the `NextIcon` and `PrevIcon` prop.

#### Example #2

Now we want to do more complex customizations. Specifically:

1. More distance between the indicator icons
2. Change the background color of the active indicator to `red`
3. Change the color of all indicators to `blue`
4. Move the indicators to the right side of the carousel
5. Move the indicators to be further away down from the carousel

We are going to use all props to style the indicators

```jsx
import Home from '@material-ui/icons/Home';

<Carousel
    IndicatorIcon={<Home/>} // Previous Example
    indicatorIconButtonProps={{
        style: {
            padding: '10px',    // 1
            color: 'blue'       // 3
        }
    }}
    activeIndicatorIconButtonProps={{
        style: {
            backgroundColor: 'red' // 2
        }
    }}
    indicatorContainerProps={{
        style: {
            marginTop: '50px', // 5
            textAlign: 'right' // 4
        }

    }}
>
    {...}
</Carousel>
```

As before, you can use `className` to style the elements externally.

### Default Styles

Giving the default styles in pseudo-code.

#### Navigation Buttons

```js
{
    buttonWrapper: {
        position: "absolute",
        height: "100px",
        backgroundColor: "transparent",
        top: "calc(50% - 70px)",
        '&:hover': {
            '& $button': {
                backgroundColor: "black",
                filter: "brightness(120%)",
                opacity: "0.4"
            }
        }
    },
    fullHeightHoverWrapper: {
        height: "100%",
        top: "0"
    },
    buttonVisible:{
        opacity: "1"
    },
    buttonHidden:{
        opacity: "0",
    },
    button: {
        margin: "0 10px",
        position: "relative",
        backgroundColor: "#494949",
        top: "calc(50% - 20px) !important",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.6 !important"
        },
    },
    // Applies to the "next" button wrapper
    next: {
        right: 0
    },
    // Applies to the "prev" button wrapper
    prev: {
        left: 0
    }
}
```

#### Indicators

```js
{
    indicators: {
        width: "100%",
        marginTop: "10px",
        textAlign: "center"
    },
    indicator: {
        cursor: "pointer",
        transition: "200ms",
        padding: 0,
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
    indicatorIcon: {
        fontSize: "15px",
    },
    // Applies to the active indicator
    active: {           
        color: "#494949"
    }
}
```

## Props

| Prop name                      | Type                                                                                                                                                       | Default                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| className                      | `string`                                                                                                                                                   | ""                                                                        | Defines custom class name(s), that will be **added** to Carousel element                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| index                          | `number`                                                                                                                                                   | `0`                                                                       | Defines which child (assuming there are more than 1 children) will be displayed. Next and Previous Buttons as well as Indicators will work normally after the first render. When this prop is updated the carousel will display the chosen child. *Use this prop to programmatically set the active child*. If (index > children.length) then if (strictIndexing) index = last element. index                                                                                                                                  |
| strictIndexing                 | `boolean`                                                                                                                                                  | `true`                                                                    | Defines whether index can be bigger than children length                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| autoPlay                       | `boolean`                                                                                                                                                  | `true`                                                                    | Defines if the component will auto scroll between children                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| stopAutoPlayOnHover            | `boolean`                                                                                                                                                  | `true`                                                                    | Defines if auto scrolling will continue while mousing over carousel                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| interval                       | `number`                                                                                                                                                   | `4000`                                                                    | Defines the interval in **ms** between active child changes (autoPlay)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| animation                      | `"fade"  \| "slide"`                                                                                                                                       | `"fade"`                                                                  | Defines the animation style of the Carousel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| reverseEdgeAnimationDirection  | `boolean`                                                                                                                                                  | `true`                                                                    | Defines whether the animation direction from the last child towards the first will be reverse. Same for the animation direction from the first child towards the last. Will not matter on `"fade"` animation.                                                                                                                                                                                                                                                                                                                  |
| timeout                        | `number  \| {appear? number, enter?: number, exit?: number}`                                                                                               | `500`                                                                     | Defines the duration of the animations. For more information refer to the [Material UI Documentation for Transitions](https://material-ui.com/components/transitions/)                                                                                                                                                                                                                                                                                                                                                         |
| swipe                          | `boolean`                                                                                                                                                  | `true`                                                                    | Defines if swiping left and right (in touch devices) triggers `next` and `prev` behaviour                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| indicators                     | `boolean`                                                                                                                                                  | `true`                                                                    | Defines the existence of bullet indicators                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| navButtonsAlwaysVisible        | `boolean`                                                                                                                                                  | `false`                                                                   | Defines if the next/previous buttons will always be visible or not                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| navButtonsAlwaysInvisible      | `boolean`                                                                                                                                                  | `false`                                                                   | Defines if the next/previous buttons will always be invisible or not                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| cycleNavigation                | `boolean`                                                                                                                                                  | `true`                                                                    | Defines if the next button will be visible on the last slide, and the previous button on the first slide. Auto-play also stops on the last slide. Indicators continue to work normally.                                                                                                                                                                                                                                                                                                                                        |
| fullHeightHover                | `boolean`                                                                                                                                                  | `true`                                                                    | Defines if the the next/previous button wrappers will cover the full **height** of the Item element and show buttons on full height hover                                                                                                                                                                                                                                                                                                                                                                                      |
| navButtonsWrapperProps         | `{className: string, style: React.CSSProperties} & React.AriaAttributes`                                                                                                          | `undefined`                                                               | Used to customize the div surrounding the nav `IconButtons`. Use this to position the buttons onto, below, outside, e.t.c. the carousel. *Tip*: Check the [default styles](#default-styles) below.                                                                                                                                                                                                                                                                                                                             |
| navButtonsProps                | `{className: string, style: React.CSSProperties} & React.AriaAttributes`                                                                                                          | `undefined`                                                               | Used to customize the actual nav `IconButton`s                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| NextIcon                       | `ReactNode`                                                                                                                                                | `<NavigateNextIcon/>`                                                     | Defines the element inside the nav "next" `IconButton`. Refer to [MaterialUI Button Documentation](https://material-ui.com/components/buttons/) for more examples. It is advised to use Material UI Icons, but you could use any element (`<img/>`, `<div/>`, ...) you like.                                                                                                                                                                                                                                                   |
| PrevIcon                       | `ReactNode`                                                                                                                                                | `<NavigateNextIcon/>`                                                     | Defines the element inside the nav "prev" `IconButton`. Refer to [MaterialUI Button Documentation](https://material-ui.com/components/buttons/) for more examples.  It is advised to use Material UI Icons, but you could use any element (`<img/>`, `<div/>`, ...) you like.                                                                                                                                                                                                                                                  |
| NavButton                      | `({onClick, className, style, prev, next}: {onClick: Function, className: string, style: React.CSSProperties, next: boolean, prev: boolean}) => ReactNode` | `undefined`                                                               | Gives full control of the nav buttons. Should return a button that uses the given `onClick`. Works in tandem with all other customization options (`navButtonsProps`, `navButtonsWrapperProps`, `navButtonsAlwaysVisible`, `navButtonsAlwaysInvisible`, `fullHeightHover`, ...). Refer to the [example section](README.md#CustomizingNavigation) for more information.                                                                                                                                                         |
| indicatorIconButtonProps       | `{className: string, style: React.CSSProperties} & React.AriaAttributes`                                                                                                          | `undefined`                                                               | Used to customize **all** indicator `IconButton`s. Additive to `activeIndicatorIconButtonProps`. Any `aria-label` property used will be rendered with the indicator index next to it. e.g. `{'aria-label': 'indicator'}` --> `'indicator 1'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| activeIndicatorIconButtonProps | `{className: string, style: React.CSSProperties} & React.AriaAttributes`                                                                                                          | `undefined`                                                               | Used to customize the **active** indicator `IconButton`. Additive to `indicatorIconButtonProps`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| indicatorContainerProps        | `{className: string, style: React.CSSProperties} & React.AriaAttributes`                                                                                                          | `undefined`                                                               | Used to customize the indicators container/wrapper.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| IndicatorIcon                  | `ReactNode`                                                                                                                                                | `<FiberManualRecordIcon size='small' className={classes.indicatorIcon}/>` | Defines the element inside the indicator `IconButton`s Refer to [MaterialUI Button Documentation](https://material-ui.com/components/buttons/) for more examples. It is advised to use Material UI Icons, but you could use any element (`<img/>`, `<div/>`, ...) you like.                                                                                                                                                                                                                                                    |
| onChange                       | `(index: number, active: number) => void` (internally: `Function`)                                                                                         | `() => {}`                                                                | Function that is called **after** internal `setActive()` method. The `setActive()` method is called when the next and previous buttons are pressed, when an indicator is pressed, or when the `index` prop changes. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**. Will be called in conjunction with and **after** `next` and `prev` props if defined. It will not get called in first render, except if `changeOnFirstRender` is defined |
| changeOnFirstRender            | `boolean`                                                                                                                                                  | `false`                                                                   | Defines if `onChange` prop will be called when the carousel renders for the first time. In `componentDidMount`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| next                           | `(next: number, active: number) => void` (internally: `Function`)                                                                                          | `() => {}`                                                                | Function that is called **after** internal `next()` method. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**                                                                                                                                                                                                                                                                                                                                  |
| prev                           | `(prev: number, active: number) => void` (internally: `Function`)                                                                                          | `() => {}`                                                                | Function that is called **after** internal `prev()` method. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**                                                                                                                                                                                                                                                                                                                                  |

## License

The MIT License.

## Author

[Learus](https://learus.github.io)
