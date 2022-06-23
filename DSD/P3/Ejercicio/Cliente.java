import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class Cliente {

    public static void main(String[] args) {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }

        String host = "localhost";
        String servInicial = "Server1";
        String servidor = "";
        String nombre = "";
        String contrasena = "";
        Scanner entrada = new Scanner(System.in);

        try {

            // Comenzamos en uno de los servIniciales para empezar
            Registry regInicial = LocateRegistry.getRegistry(host, 1099);
            Donacion_I donaciones = (Donacion_I) regInicial.lookup(servInicial);

            boolean loged = false;
            boolean salir = false;
            String opcion;

            while (!salir) {
                if (!loged) {
                    System.out.println("Seleccione una de las siguientes opciones:\n" +
                            "\nI: Identificarse\n" +
                            "\nR: Registrarse\n" +
                            "\nS: Salir\n");
                    opcion = entrada.nextLine();

                    switch (opcion) {
                        case "R":
                            System.out.println("\nRealizar Registro \n");
                            System.out.println("Intorduzca el nombre de usuario: ");
                            nombre = entrada.nextLine();
                            System.out.println("Introduzca la contrasena de su cuenta: ");
                            contrasena = entrada.nextLine();

                            if (!donaciones.registrar(nombre, contrasena)){
                               System.out.println("\nERRORYa esta registrado\n");
                            }
                          

                            break;

                        case "I":
                            System.out.println("\nRealizar Login\n");
                            System.out.println("Intorduzca el nombre de usuario: ");
                            nombre = entrada.nextLine();
                            System.out.println("Introduzca la contrasena de su cuenta: ");
                            contrasena = entrada.nextLine();

                                //Trabajamos mirando a su servidor donde este registrado
                                servidor = donaciones.getServerUsuario(nombre);
                                donaciones = (Donacion_I) regInicial.lookup(servidor);

                            if (donaciones.loginUsuario(nombre, contrasena)) {
                                loged = true;
                                System.out.println("\nLogeado: " + nombre +
                                        " en " + servidor + "\n");
                            } else
                                System.out.println("\nError \n");

                            break;

                        case "S":
                            salir = true;
                            System.out.println("\n Saliendo");

                            break;

                        default:

                            break;
                    }
                } else {
                    System.out.println(
                            "Selecciona una de las siguientes opciones:\n"
                            + "\nD: Realizar una donación\n"
                            + "\nT: Realizar consulta donado \n"
                            + "\nS: Salir\n");
                    opcion = entrada.nextLine();

                    switch (opcion) {
                        case "D":
                            float aux;
                            System.out.println("\n Realizar Donacion: \n");
                            do {
                                System.out.println("Intorduzca el cantidad a donar: ");
                                aux = Float.parseFloat(entrada.nextLine());
                            } while (aux <= 0);

                            donaciones.donar(nombre, aux);

                            System.out.println("\nDonacion " + nombre + "por" + aux + "hecha\n");

                            break;

                        case "T":
                            int numero;
                            float auxTotal;
                            System.out.println("\n Realizar Consulta total: \n");
                            // Comprobamos el numero de donaciones del usuario para comprobar si ha hecho al
                            // menos una
                            numero = donaciones.getNumTotalDonaciones(nombre);

                            if (numero > 0) {
                                auxTotal = donaciones.getTotalDonado();

                                System.out.println("El total donado  " + auxTotal + "\n");
                            } else
                                System.out.println("No ha realizado una donacion aun\n");

                            break;

                        case "S":
                            System.out.println("\nSaliendo\n");
                            loged = false;

                            break;

                        default:

                            break;
                    }

                }
            }
        } catch (NotBoundException | RemoteException e) {
            System.err.println("Exception del sistema: " + e);
        }
    }

}
