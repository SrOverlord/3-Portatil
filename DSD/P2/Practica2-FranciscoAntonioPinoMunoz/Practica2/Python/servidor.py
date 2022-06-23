import glob
import sys

from calculadora import Calculadora

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

import logging

logging.basicConfig(level=logging.DEBUG)


class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("me han hecho ping()")

    def sumar(self, operador1, operador2):
        print("sumando " + str(operador1) + " con " + str(operador2))
        return operador1 + operador2

    def restar(self, operador1, operador2):
        print("restando " + str(operador1) + " con " + str(operador2))
        return operador1 - operador2

    def multiplicar(self, operador1, operador2):
        print("multiplicando " + str(operador1) + " con " + str(operador2))
        return operador1 * operador2
    
    def dividir(self, operador1, operador2):
        print("dividiendo " + str(operador1) + " entre " + str(operador2))
        return operador1 / operador2

if __name__ == "__main__":
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("iniciando servidor...")
    server.serve()
    print("fin")
