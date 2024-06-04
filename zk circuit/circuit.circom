pragma circom 2.1.6;

template IsZero() {
    signal input in;
    signal output out;

    signal inv;

    inv <-- in!=0 ? 1/in : 0;

    out <== -in*inv +1;
    in*out === 0;
}

template Factorize () {
    signal input a;
    signal input b;
    91 === a * b;

    signal inter;
    inter <== (1 - a) * (1 - b);
    component zeroCheck = IsZero();
    zeroCheck.in <== inter;
    0 === zeroCheck.out;
}

component main  = Factorize();
