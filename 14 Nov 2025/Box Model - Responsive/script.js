document.addEventListener('DOMContentLoaded', function() {
    const marginSlider = document.getElementById('margin');
    const marginLeftSlider = document.getElementById('margin-left');
    const marginRightSlider = document.getElementById('margin-right');

    const borderSlider = document.getElementById('border');
    const paddingSlider = document.getElementById('padding');

    const boxExample = document.querySelector('.box-model-example');
    
    const marginValue = document.getElementById('margin-value');
    const marginLeftValue = document.getElementById('margin-left-value');
    const marginRightValue = document.getElementById('margin-right-value');

    const borderValue = document.getElementById('border-value');
    const paddingValue = document.getElementById('padding-value');

    // Margin (all sides)
    marginSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.margin = value;
        marginValue.textContent = value;
    });

    // Margin Left
    marginLeftSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.marginLeft = value;
        marginLeftValue.textContent = value;
    });

    // Margin Right
    marginRightSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.marginRight = value;
        marginRightValue.textContent = value;
    });
    
    // Border
    borderSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.borderWidth = value;
        borderValue.textContent = value;
    });
    
    // Padding
    paddingSlider.addEventListener('input', function() {
        const value = this.value + 'px';
        boxExample.style.padding = value;
        paddingValue.textContent = value;
    });
});
