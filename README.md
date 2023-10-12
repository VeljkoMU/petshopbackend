# Compose Applied Multistep Animations

The Compose Appled Multistep Animations library for Jetpack Compose is designed to streamline the implementation of intricate step-by-step animations on Android. Its primary objectives are to minimize the requirement for boilerplate code and reduce the overall code volume needed for substantial animated elements and screens. In addition to facilitating multistep animations, the library provides a straightforward method for defining and reusing animation objects indefinitely. Furthermore, it offers a mechanism for consolidating AnimatedVisibility components, resulting in a more organized Compose codebase.

## Installation

Add Compose Applied Muiltistep Animations to your project via JitPack:

```gradle
implementation("")
```

## Usage

### Using AnimatedVisibilityGroup
When using AnimatedVisibility for multiple elements in a single component, the code tends to get cluttered and messy. To avoid this, you can group AnimatedVisibility items which use the same transition, with different triggers for each animated item, like to:

<table border="0">
 <tr>
   <td>
     
```kotlin
// Each Item is triggered by a different state,
// but the same animation is applied to all items
 AnimatedVisibilityGroup(
   enter = fadeIn(tween(500)),
   exit = fadeOut(tween(1000))
    ) {

   Item(visiblityState = stateOne.value) {
   Box(
     modifier = Modifier
     .size(100.dp)
     .background(Color.Red)
     )
  }

 Item(visiblityState = stateTwo.value) {
   Box(
       modifier = Modifier
       .size(100.dp)
       .background(Color.Green)
       )
   }

  Item(visiblityState = stateThree.value) {
    Box(
       modifier = Modifier
       .size(100.dp)
       .background(Color.Blue)
    )
  }
}
```
</td>
<td>

<img src="https://github.com/VeljkoMU/petshopbackend/assets/54106788/55aa0948-1227-49c7-b226-8192a5085b59" width = 300>
</td>
 </tr>
</table>

### AnimatedVisibility Item with extened animations
Each item in an AnimatedVisibilityGroup has the option to extend the animation defined for its group and to add its own animation to the content.
In the example below, the top box has an extended animation compared to the other boxes in the group.

<table border=0>
<tr>
  <td>

```kotlin
      AnimatedVisibilityGroup(
          enter = fadeIn(tween(500)),
          exit = fadeOut(tween(1000))
       ) {

          Item(
          visiblityState = stateOne.value,
           extendedEnterTransition = slideInVertically(
               spring(0.1F)
           ),
           extendedExitTransition = slideOutVertically(tween(800))
       ) {
          Box(
              modifier = Modifier
               .size(100.dp)
               .background(Color.Red)
                  )
             }

           Item(visiblityState = stateTwo.value) {
                   Box(
                        modifier = Modifier
                        .size(100.dp)
                        .background(Color.Green)
                           )
                        }

           Item(visiblityState = stateThree.value) {
                Box(
                     modifier = Modifier
                     .size(100.dp)
                     .background(Color.Blue)
                            )
                        }
                    }
```
    
  </td>
  <td>
    <img src = "https://github.com/VeljkoMU/petshopbackend/assets/54106788/7f9ddd96-e881-4963-a574-5ba768e62f64" width = 300>

  </td>
</tr>
</table>

### Using MultistepAnimations to define a reusable multistep animation and applying it

We can define a mutlistep animation as an MultistepAnimationState object, we define all the steps of the animation as shown in the example below, and reuse the object when we need it.

```kotlin
  val triggerState = mutableStateOf(0) // This is the state that triggers step changes
        val multistepAnimation = MultistepAnimationState(
            triggerState = triggerState,
            // Here we add the steps
            MultistepAnimationState.AnimationSteps(
                key = 0, // When the trigger state is 0, animate properties of the composable to the fallowing target values
                animatedWidth = 50.dp,
                animatedHeight = 50.dp,
                // We don't want to animate padding in this step, so we set it to null
                animatedPadding = null,
                animatedBackgroundColor = Color.Red,
                animationSpec = tween(800) // For each step we define an AniamtionSpec that will be used in that step
            ),
            // We define as many steps as we need
            MultistepAnimationState.AnimationSteps(
                key = 1,
                animatedWidth = 100.dp,
                animatedHeight = 100.dp,
                animatedBackgroundColor = Color.Blue,
                animationSpec = tween(200)
            )
        )

        // We can also add and remove steps from the animation object
        multistepAnimation.addStep(
            2, MultistepAnimationState.AnimationSteps(
                key = 2,
                animatedWidth = 200.dp,
                animatedHeight = 200.dp,
                animatedBackgroundColor = Color.Green,
                animationSpec = tween(1000)
            )
        )
```

Once the animation is defined and all the steps are defined, we can apply it to any composable like so

```Kotlin
// We call the MultistepAnimation Composable and aniamte the components in it's scope, we pass it the animation used in that scope
MultistepAnimation(
   triggerState = triggerState,
   animationState = multistepAnimation
) {
  Box(modifier = Modifier.applyAnimation()) // We call the applyAnimation modifier on each component we want to animate
   Box(
     modifier = Modifier
     .size(30.dp)
     .background(Color.Black)
     )
} // Components without the modefier will not be animated
```

As we change the triggerState, and as the triggerState taked the values defined in the steps of the animation, the animation runs from step to step, like so

<table border = 0>
<tr>
<td>

```kotlin
  // We change the triggerState value
  //so trigger individual steps in the animation
 delay(2000)
 triggerState.value = 0
 delay(2000)
 triggerState.value = 1
 delay(2000)
 triggerState.value = 2
 delay(2000)
 triggerState.value = 0
```

</td>
<td>
  <img src= "https://github.com/VeljkoMU/petshopbackend/assets/54106788/3b8031e9-5b75-452d-ac34-773179879e16" width = 300>
</td>
</tr>
</table>

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
