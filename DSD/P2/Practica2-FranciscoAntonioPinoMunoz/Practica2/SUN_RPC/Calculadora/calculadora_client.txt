#include "calculadora.h"
#include<stdio.h>// printf
#include<string.h>
#include<stdbool.h>// Booleanos


double *
dirprog_1(char *host,double valor1, char operacion, double valor2 )
{
	CLIENT *clnt;
	double  *result_1;
	double sumar_1_operador_1 = valor1;
	double sumar_1_operador_2 = valor2;
	double  *result_2;
	double restar_1_operador_1 = valor1;
	double restar_1_operador_2 = valor2;
	double  *result_3;
	double multiplicar_1_operador_1 = valor1;
	double multiplicar_1_operador_2 = valor2;
	double  *result_4;
	double dividir_1_operador_1 = valor1;
	double dividir_1_operador_2 = valor2;

#ifndef	DEBUG
	clnt = clnt_create (host, DIRPROG, CALCULADORA, "udp");
	if (clnt == NULL) {
		clnt_pcreateerror (host);
		exit (1);
	}
#endif	/* DEBUG */
switch (operacion)
{
        case '+':

	result_1 = sumar_1(sumar_1_operador_1, sumar_1_operador_2, clnt);
	if (result_1 == (double *) NULL) {
		clnt_perror (clnt, "call failed");
	}
	return result_1;
	break;
	case '-':
	result_2 = restar_1(restar_1_operador_1, restar_1_operador_2, clnt);
	if (result_2 == (double *) NULL) {
		clnt_perror (clnt, "call failed");
	}
	return result_2;
	break;
	case '*':
	result_3 = multiplicar_1(multiplicar_1_operador_1, multiplicar_1_operador_2, clnt);
	if (result_3 == (double *) NULL) {
		clnt_perror (clnt, "call failed");
	}
	return result_3;
	break;
	case '/':
	result_4 = dividir_1(dividir_1_operador_1, dividir_1_operador_2, clnt);
	if (result_4 == (double *) NULL) {
		clnt_perror (clnt, "call failed");
	}
	return result_4;
	break;
	default:
	break;
}
#ifndef	DEBUG
	clnt_destroy (clnt);
#endif	 /* DEBUG */
}


int
main (int argc, char *argv[])
{
	char *host;
	char operacion = "";
	char aux;
	double *resultado = NULL ;
	double operador1 = 0, operador2 = 0;
	bool salir = false;
	

	if (argc < 2) {
		printf ("usage: %s server_host\n", argv[0]);
		exit (1);
	}else{
		printf("\n Introduzca la operacion \n");
	}
	host = argv[1];
	

	while (!salir){

		//____________Primer Operador_______________
		if( resultado == NULL){
		printf("\nPrimer operador: ");
    		scanf("%lf", &operador1);
		}else{
		printf("\nResultado anterior: %.2f\n", *resultado);
		operador1 = *resultado;
		}

		//____________Operacion_____________________

		printf("\nOperacion:");
    		scanf("%s", &operacion);

		//___________Segundo Operador_______________

		printf("\nSegundo operador: ");
    		scanf("%lf", &operador2);
                
                //_____Mandamos ejecutar la funcion_____
		resultado = dirprog_1 (host,operador1, operacion, operador2);

		//______________Resultado y salida ____________________________
		printf("\n\nEl resultado es %.2f \nDesea continuar (S o N)?",*resultado );
		scanf("%s", &aux);
		if( aux == 'n'||aux == 'N'){
			salir = true;
		}
                
	}
	
exit (0);
}
