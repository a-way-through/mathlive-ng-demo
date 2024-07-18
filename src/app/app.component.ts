import { Component, AfterViewInit } from '@angular/core';
import { MathfieldElement, MathfieldOptions, VirtualKeyboardInterface } from 'mathlive';
// import { MathfieldElement, VirtualKeyboardInterface } from 'mathlive';
// import {VirtualKeyboardInterface} from 'mathlive';
import { CustomVirtualKeyboard } from 'src/types/mathlive'; // Adjust the path if necessary
// import 'mathlive';

declare global {
  interface Window {
    mathVirtualKeyboard: CustomVirtualKeyboard;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'mathlive-angular-demo';
  mathFieldInstance: any | undefined;
  latex: string | undefined;
  mathFieldConfig = {
    virtualKeyboardMode: 'onfocus',
    sounds: {
      keypress: false, // Disable keypress sound
    },
  };

  constructor() {
    MathfieldElement.fontsDirectory = 'assets/MathLive/fonts';
  }

  ngAfterViewInit() {
    MathfieldElement.soundsDirectory = null;
    window.mathVirtualKeyboard.hide();
    setTimeout(() => {
      this.mathFieldInstance = document.getElementById('mathLiveFormulaContainer');
      // if (mathFieldContainer) {
      //   this.mathFieldInstance = new MathfieldElement();
      // }
      this.mathFieldInstance.mathModeSpace = '\\:';
      // this.mathFieldInstance.soundsDirectory = null;
      // window.mathVirtualKeyboard.container = document.getElementById('mathLiveVirtualKeyboard');
      // window.mathVirtualKeyboard.container = document.body;
      // console.log('-window.mathVirtualKeyboard.container.style.height-', window.mathVirtualKeyboard.container.style.height);
      // window.mathVirtualKeyboard.container.style.height = '218px';
      // window.mathVirtualKeyboard.layouts = ["numeric", "symbols"];
      this.mathFieldInstance.mathVirtualKeyboardPolicy = "manual";
      this.mathFieldInstance.addEventListener("focusin", () =>  {
        window.mathVirtualKeyboard.show();
      });
      this.mathFieldInstance.addEventListener("focusout", () =>  { 
        window.mathVirtualKeyboard.hide();
      });

      console.log('this.latex',this.latex)
      // this.latex = this.latex.replace(/\s+/g,' ');
      // this.latex = this.latex.replace(/\s/g,'\\:');
      // console.log('this.latex',this.latex)
      this.mathFieldInstance.setValue(this.latex ? this.latex : '');
      window.mathVirtualKeyboard.show();
      this.mathFieldInstance.focus();
    }, 300); // Adjust delay as needed
  }

  close() {
    window.mathVirtualKeyboard.hide();
  }

  save() {
    window.mathVirtualKeyboard.hide();
    console.log('Saved formula:', null);
    if (this.mathFieldInstance) {
      const formula = this.mathFieldInstance.value;
      console.log('Saved formula:', formula);
    }
  }
}