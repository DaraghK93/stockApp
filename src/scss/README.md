### README:

As variables have a scope, if a variable is only used in one place, 
they should be placed in their own separate file as below:

scss/
      globalVariables.scss
      /sampleComponent/
                     sampleComponent.scss
                     sampleComponentVariables.scss 

Otherwise, place them in the glbal_variables.scss file and state where they are used in the app.