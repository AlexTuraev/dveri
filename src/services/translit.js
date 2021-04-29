/*
    Транслитерация Русского текста в Английский.
    Например, межк -> mezhk
*/

const translitRuToEn = (text='') => {
    const arr = {};
    let res = '';

    arr["Ё"]="YO";arr["Й"]="I";arr["Ц"]="TS";arr["У"]="U";arr["К"]="K";arr["Е"]="E";arr["Н"]="N";arr["Г"]="G";arr["Ш"]="SH";arr["Щ"]="SCH";arr["З"]="Z";arr["Х"]="H";arr["Ъ"]="";
    arr["ё"]="yo";arr["й"]="i";arr["ц"]="ts";arr["у"]="u";arr["к"]="k";arr["е"]="e";arr["н"]="n";arr["г"]="g";arr["ш"]="sh";arr["щ"]="sch";arr["з"]="z";arr["х"]="h";arr["ъ"]="";
    arr["Ф"]="F";arr["Ы"]="Y";arr["В"]="V";arr["А"]="arr";arr["П"]="P";arr["Р"]="R";arr["О"]="O";arr["Л"]="L";arr["Д"]="D";arr["Ж"]="ZH";arr["Э"]="E";
    arr["ф"]="f";arr["ы"]="y";arr["в"]="v";arr["а"]="a";arr["п"]="p";arr["р"]="r";arr["о"]="o";arr["л"]="l";arr["д"]="d";arr["ж"]="zh";arr["э"]="e";
    arr["Я"]="YA";arr["Ч"]="CH";arr["С"]="S";arr["М"]="M";arr["И"]="I";arr["Т"]="T";arr["Ь"]="";arr["Б"]="B";arr["Ю"]="YU";
    arr["я"]="ya";arr["ч"]="ch";arr["с"]="s";arr["м"]="m";arr["и"]="i";arr["т"]="t";arr["ь"]="";arr["б"]="b";arr["ю"]="yu"; arr[" "]="-";

    arr["a"]="a";arr["b"]="b";arr["c"]="c";arr["d"]="d";arr["e"]="e";arr["f"]="f";arr["g"]="g";arr["h"]="h";arr["i"]="i"; arr["j"]="j";
    arr["k"]="k";arr["l"]="l";arr["m"]="m";arr["n"]="n";arr["o"]="o";arr["p"]="p";arr["q"]="q";arr["r"]="r";arr["s"]="s"; arr["t"]="t";
    arr["u"]="u";arr["v"]="v";arr["w"]="w";arr["x"]="x";arr["y"]="y";arr["z"]="z";

    for(let i = 0; i < text.length; i++) {
        const c = text.charAt(i);

        res += arr[c] || '-'; /* '-' - для того, чтобы обезопаситься от непонятных символов в text (т.е. в title), т.к. res пойдет в url */
    }

    return res;
}

export default translitRuToEn;