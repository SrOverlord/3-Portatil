from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)

transport.open()
Nosalir = True
resultado = None
PrimerOperador = 0
Operacion = None
SegundoOperador = 0

print("hacemos ping al server")
client.ping()

while Nosalir:

    if resultado == None:
        PrimerOperador = input("Primer Operador: ")
    else:
        print("\nResultado Anterior: " + str(resultado))
        PrimerOperador = resultado
    
    operacion = input("\nOperacion: ")
    
    SegundoOperador = input("\nsegundo Operador: ")   
    
    
    if operacion == "+":
        resultado = client.sumar(float(PrimerOperador), float(SegundoOperador))
    elif operacion == "-":
        resultado = client.restar(float(PrimerOperador), float(SegundoOperador))
    elif operacion == "*":
        resultado = client.multiplicar(float(PrimerOperador), float(SegundoOperador))
    elif operacion == "/":
        resultado = client.dividir(float(PrimerOperador), float(SegundoOperador))
        
    print("El resultado es " + str(resultado))
    opcion = input("\nDesea continuar (S o N)")
    
    if(opcion == "n" or opcion == "N" ):
        Nosalir = False


transport.close()
