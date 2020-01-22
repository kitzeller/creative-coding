var imageData;

var the_i = 0;
var the_j = 0;

var SORT_BY = 0;
var ORIGINAL_IMAGE;

window.onload = function () {

    var img = new Image();
    img.src = "artechouse_vsm.JPG";

    var canvas = document.getElementById("canvas");
    canvas.width = 200;
    canvas.height = 150;

    window.ctx = canvas.getContext("2d");

    img.onload = function () {

        ORIGINAL_IMAGE = img;
        ctx.drawImage(img, 0, 0);

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        render();
        // setTimeout(selectionSort_nBlocks, 100)
        // setTimeout(selectionSort_Vis, 100);
        // setTimeout(selectionSort, 100);
        // render();

    };

};

/**
 * Resets the image
 */
var reset = function () {
    ctx.drawImage(ORIGINAL_IMAGE, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};


var selectionSort = function () {
    SORT_BY = document.querySelector('input[name="sortby"]:checked').value;

    count_col = 0;
    count_row = 0;
    console.log(imageData.data.length);
    for (i = 0; i < imageData.data.length; i += canvas.width * 4) {
        count_col++;
        count_row = 0;
        for (j = i; j < i + canvas.width * 4; j += 4) {
            min_id = j;

            for (k = min_id + 4; k < i + canvas.width * 4; k += 4) {
                if (rgb2hsv(imageData.data[k], imageData.data[k + 1], imageData.data[k + 2])[SORT_BY] < rgb2hsv(imageData.data[min_id], imageData.data[min_id + 1], imageData.data[min_id + 2])[SORT_BY]) {
                    min_id = k;
                }
            }

            count_row++;

            r = imageData.data[j];
            g = imageData.data[j + 1];
            b = imageData.data[j + 2];
            a = imageData.data[j + 3];

            imageData.data[j] = imageData.data[min_id]; // R
            imageData.data[j + 1] = imageData.data[min_id + 1]; // G
            imageData.data[j + 2] = imageData.data[min_id + 2]; // B
            imageData.data[j + 3] = imageData.data[min_id + 3]; // A

            imageData.data[min_id] = r;
            imageData.data[min_id + 1] = g;
            imageData.data[min_id + 2] = b;
            imageData.data[min_id + 3] = a;
        }
    }

    console.log("col_count: " + count_col);
    console.log("row_count: " + count_row);

    render();
};

var selectionSort_nBlocks = function () {
    SORT_BY = document.querySelector('input[name="sortby"]:checked').value;
    n_block = document.getElementById("n_range").value;
    console.log(n_block);
    console.log(imageData.data.length);
    console.log((canvas.width/n_block)*4);
    for (i = 0; i < imageData.data.length; i += (canvas.width/n_block)*4) {
        for (j = i; j < i + ((canvas.width/n_block)*4); j += 4) {
            min_id = j;

            for (k = min_id + 4; k < i + ((canvas.width/n_block)*4); k += 4) {
                if (rgb2hsv(imageData.data[k], imageData.data[k + 1], imageData.data[k + 2])[SORT_BY] < rgb2hsv(imageData.data[min_id], imageData.data[min_id + 1], imageData.data[min_id + 2])[SORT_BY]) {
                    min_id = k;
                }
            }

            r = imageData.data[j];
            g = imageData.data[j + 1];
            b = imageData.data[j + 2];
            a = imageData.data[j + 3];

            imageData.data[j] = imageData.data[min_id]; // R
            imageData.data[j + 1] = imageData.data[min_id + 1]; // G
            imageData.data[j + 2] = imageData.data[min_id + 2]; // B
            imageData.data[j + 3] = imageData.data[min_id + 3]; // A

            imageData.data[min_id] = r;
            imageData.data[min_id + 1] = g;
            imageData.data[min_id + 2] = b;
            imageData.data[min_id + 3] = a;
        }
    }

    render();
};

var selectionSort_Vis = function () {
    SORT_BY = document.querySelector('input[name="sortby"]:checked').value;

    if (the_i < imageData.data.length) {
        if (the_j < the_i + canvas.width * 4) {

            min_id = the_j;

            for (k = min_id + 4; k < the_i + canvas.width * 4; k += 4) {
                if (rgb2hsv(imageData.data[k], imageData.data[k + 1], imageData.data[k + 2])[SORT_BY] < rgb2hsv(imageData.data[min_id], imageData.data[min_id + 1], imageData.data[min_id + 2])[SORT_BY]) {
                    min_id = k;
                }
            }

            r = imageData.data[the_j];
            g = imageData.data[the_j + 1];
            b = imageData.data[the_j + 2];
            a = imageData.data[the_j + 3];

            imageData.data[the_j] = imageData.data[min_id]; // R
            imageData.data[the_j + 1] = imageData.data[min_id + 1]; // G
            imageData.data[the_j + 2] = imageData.data[min_id + 2]; // B
            imageData.data[the_j + 3] = imageData.data[min_id + 3]; // A

            imageData.data[min_id] = r;
            imageData.data[min_id + 1] = g;
            imageData.data[min_id + 2] = b;
            imageData.data[min_id + 3] = a;

            the_j += 4;
        } else {
            the_i += canvas.width * 4;
            the_j = the_i;
        }
    }

    render();
    setTimeout(selectionSort_Vis, 0);
};

var render = function () {
    ctx.putImageData(imageData, 0, 0);
};


// http://www.javascripter.net/faq/rgb2hsv.htm
function rgb2hsv(r, g, b) {
    var computedH = 0;
    var computedS = 0;
    var computedV = 0;

    //remove spaces from input RGB values, convert to int
    r = parseInt(('' + r).replace(/\s/g, ''), 10);
    g = parseInt(('' + g).replace(/\s/g, ''), 10);
    b = parseInt(('' + b).replace(/\s/g, ''), 10);

    // console.log(r, g, b);

    if (r == null || g == null || b == null ||
        isNaN(r) || isNaN(g) || isNaN(b)) {

        console.log(r, g, b);
        alert('Please enter numeric RGB values!');
        return;
    }
    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
        alert('RGB values must be in the range 0 to 255.');
        return;
    }
    r = r / 255;
    g = g / 255;
    b = b / 255;
    var minRGB = Math.min(r, Math.min(g, b));
    var maxRGB = Math.max(r, Math.max(g, b));

    // Black-gray-white
    if (minRGB === maxRGB) {
        computedV = minRGB;
        return [0, 0, computedV];
    }

    // Colors other than black-gray-white:
    var d = (r === minRGB) ? g - b : ((b === minRGB) ? r - g : b - r);
    var h = (r === minRGB) ? 3 : ((b === minRGB) ? 1 : 5);
    computedH = 60 * (h - d / (maxRGB - minRGB));
    computedS = (maxRGB - minRGB) / maxRGB;
    computedV = maxRGB;
    return [computedH, computedS, computedV];
}
