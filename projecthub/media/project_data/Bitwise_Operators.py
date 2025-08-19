x = 15
y = 30

# We first check the binary representation of the assigned variables.
print("Binary of x is: ", bin(x))  # 15 in binary is 0b1111
print("Binary of y is: ", bin(y))  # 30 in binary is 0b11110

# Bitwise AND " & " (Performs AND operation on each bit)
print("After using Bitwise AND: ", x & y, "| Binary of x & y: ", bin(x & y))
# AND operation keeps only the bits that are 1 in both numbers.

# Bitwise OR " | " (Performs OR operation on each bit)
print("After using Bitwise OR: ", x | y, "| Binary of x | y: ", bin(x | y))
# OR operation keeps all bits that have at least one 1.

# Bitwise XOR " ^ " (Performs XOR operation on each bit)
print("After using Bitwise XOR: ", x ^ y, "| Binary of x ^ y:", bin(x ^ y))
# XOR results in 1 only where bits are different.

# Bitwise NOT " ~ " (Flips bits and applies two’s complement)
print("After using Bitwise NOT on x: ", ~x, "| Binary of ~x: ", bin(~x))
# NOT operation inverts bits and adds -1, making it `-(x + 1)`.

print("After using Bitwise NOT on y: ", ~y, "| Binary of ~y: ", bin(~y))
# NOT operation inverts bits and adds -1, making it `-(y + 1)`.

# Bitwise Left Shift " << " (Shifts bits to the left, multiplying by 2^n)
print("After left shift by 2: ", x << 2, "| Binary: ", bin(x << 2))
# Left shift by 2 moves bits left, equivalent to multiplying by 4.

# Bitwise Right Shift " >> " (Shifts bits to the right, dividing by 2^n)
print("After right shift by 2: ", x >> 2, "| Binary: ", bin(x >> 2))
# Right shift by 2 moves bits right, equivalent to integer division by 4.
