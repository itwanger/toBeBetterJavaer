package com.cmower.java_demo.sixteen;

import java.util.ArrayList;
import java.util.List;

public class Cmower {

	class Dog extends Pet {
	}

	class Cat extends Pet {
	}

	class Pet {

	}

	class PetHouse<T> {
		private List<T> list;

		public PetHouse() {
		}

		public void add(T item) {
			list.add(item);
		}

		public T get() {
			return list.get(0);
		}
	}

	public static void main(String[] args) {
		Cmower cmower = new Cmower();

		PetHouse<Pet> petHouse = cmower.new PetHouse<>();
		
		
PetHouse<? extends Pet> petHouse1 = cmower.new PetHouse<Cat>();
petHouse1.get();
//		petHouse1.add(cmower.new Cat());
		// The method add(capture#1-of ? extends Cmower.Pet) in the type Cmower.PetHouse<capture#1-of ? extends Cmower.Pet> 
		// is not applicable for the arguments (Cmower.Cat)
		
		petHouse1.get();
	}

}
