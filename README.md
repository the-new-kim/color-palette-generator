🎨 Color Palette Gernerator 👨‍🎨          

[ ] Set Base Color   
[x] Filter(Color Harmonies)  
[x] Add Color  
[ ] Remove Color
[ ] Move Color + drag and drop  
[ ] Extract Color from Image ... if there is time...   

////////////////////////////////////////////////////////////////////          

📝 Color Harmonies      
Complementary  
Triadic  
Tetradic (60deg & 120deg)  
Square  
Analogous (30deg)  
Neutral (15deg)  
Monochromatic          

📝 Color Shades, Tints and Tones         
Shades (Adding Black: lightness ⬇️ )    
Tints (Adding White: lightness ⬆️ )     
Tones (Adding Gray: saturation ⬇️ lightness ⬆️)    


⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙    
⚙ Generating process ⚙     
⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙⚙     

generatePalette()    
    ⬇  
?baseColor? no ➡ baseColor = generateSingleColor()   
   yes        
    ⬇  
generateMultipleColors()    
    ⬇  
?colorHarmony? no ➡ create random colorHarmony     
   yes    
    ⬇     
each colors(loop)    
  ⬇ ⬇ ⬇     
generateSinglColor()    
    ⬇     
?any filter for H,S,L? no ➡ random H,S,L    
   yes    
    ⬇     
  DONE!     

////////////////////////////////////////////////////////////////////       
